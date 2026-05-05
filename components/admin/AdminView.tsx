"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import {
  upsertProduct,
  deleteProduct,
  upsertGalleryItem,
  deleteGalleryItem,
  updateInquiryStatus,
  updateOrderStatus,
} from "@/app/actions";

type OrderStatus = "PENDING" | "PAID" | "SHIPPED";
type InquiryStatus = "NEW" | "IN_PROGRESS" | "CLOSED";

interface AdminProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  stock: number;
  category: string;
  images: string[];
}

interface AdminGalleryItem {
  id: string;
  title: string;
  date: string;
  size: string;
  src: string;
  category: string;
  onHomepage: boolean;
}

interface AdminOrder {
  id: string;
  createdAt: string | Date;
  total: string;
  status: OrderStatus;
  user: {
    name: string | null;
    email: string;
  };
  items: Array<{
    id: string;
    quantity: number;
    price: string;
    product: {
      id: string;
      title: string;
      price: string;
    };
  }>;
}

interface AdminInquiry {
  id: string;
  name: string;
  company: string | null;
  email: string;
  inquiryType: string;
  message: string;
  status: InquiryStatus;
  createdAt: string | Date;
}

interface AdminViewProps {
  products: AdminProduct[];
  galleryItems: AdminGalleryItem[];
  orders: AdminOrder[];
  inquiries: AdminInquiry[];
}

export default function AdminView({ products, galleryItems, orders, inquiries }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<"SHOP" | "GALLERY" | "ORDERS" | "INQUIRIES">("GALLERY");
  const [filterStatus, setFilterStatus] = useState<"ALL" | OrderStatus>("ALL");
  
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [editingGalleryItem, setEditingGalleryItem] = useState<AdminGalleryItem | null>(null);
  const [detectedSize, setDetectedSize] = useState<string>("square");

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      if (ratio > 1.2) setDetectedSize("wide");
      else if (ratio < 0.8) setDetectedSize("tall");
      else setDetectedSize("square");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
        case 'PAID': return 'bg-green-100 text-green-800 border-green-200';
        case 'SHIPPED': return 'bg-blue-100 text-blue-800 border-blue-200';
        default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "ALL") return true;
    return order.status === filterStatus;
  });

  return (
    <div>
      {/* TABS */}
      <div className="flex gap-8 mb-8 border-b border-gray-200 pb-4">
        <button onClick={() => setActiveTab("GALLERY")} className={`text-sm font-bold tracking-widest uppercase ${activeTab === "GALLERY" ? "text-black border-b-2 border-black pb-4 -mb-4.5" : "text-gray-400"}`}>
          Gallery
        </button>
        <button onClick={() => setActiveTab("INQUIRIES")} className={`text-sm font-bold tracking-widest uppercase ${activeTab === "INQUIRIES" ? "text-black border-b-2 border-black pb-4 -mb-4.5" : "text-gray-400"}`}>
          Inquiries ({inquiries.length})
        </button>
      </div>

      {/* === ORDERS SECTION === */}
      {activeTab === "ORDERS" && (
        <div className="space-y-6">
            <div className="flex gap-2">
                {(["ALL", "PENDING", "PAID", "SHIPPED"] as const).map((status) => {
                    const count = status === "ALL" ? orders.length : orders.filter(o => o.status === status).length;
                    return (
                        <button key={status} onClick={() => setFilterStatus(status)} className={`px-4 py-2 text-xs font-bold rounded-full border transition-all ${filterStatus === status ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"}`}>
                            {status === "ALL" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()} 
                            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${filterStatus === status ? "bg-white text-black" : "bg-gray-100 text-gray-600"}`}>{count}</span>
                        </button>
                    );
                })}
            </div>

            {filteredOrders.length === 0 ? (
                <div className="bg-white p-12 rounded-xl text-center text-gray-400 border border-gray-100 border-dashed">No {filterStatus !== "ALL" && filterStatus.toLowerCase()} orders found.</div>
            ) : (
                filteredOrders.map((order) => (
                    <div key={order.id} className="bg-white border border-gray-100 rounded-lg p-6 flex flex-col md:flex-row justify-between gap-6 hover:shadow-sm transition-shadow">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-mono text-xs text-gray-400">#{order.id.slice(-6)}</span>
                                <span className="text-xs text-gray-400">• {new Date(order.createdAt).toLocaleDateString('en-GB')}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded border font-bold uppercase ${getStatusColor(order.status)}`}>{order.status}</span>
                            </div>
                            <h3 className="font-bold text-sm mb-1">{order.user.name || "Guest"}</h3>
                            <p className="text-xs text-gray-500 mb-4">{order.user.email}</p>
                            <div className="space-y-1">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-2 text-sm"><span className="text-gray-400">{item.quantity}x</span><span>{item.product.title}</span></div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-between min-w-[200px]">
                            <p className="font-serif text-xl mb-4">${Number(order.total).toFixed(2)}</p>
                            <form action={updateOrderStatus} className="flex items-center gap-2">
                                <input type="hidden" name="orderId" value={order.id} />
                                <select key={order.status} name="status" defaultValue={order.status} className="bg-gray-50 border border-gray-200 text-xs rounded p-2 cursor-pointer hover:border-black transition-colors" onChange={(e) => e.target.form?.requestSubmit()}>
                                    <option value="PENDING">Pending Payment</option>
                                    <option value="PAID">Paid / Processing</option>
                                    <option value="SHIPPED">Shipped</option>
                                </select>
                            </form>
                        </div>
                    </div>
                ))
            )}
        </div>
      )}

      {/* === SHOP SECTION === */}
      {activeTab === "SHOP" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit border border-gray-100">
            <h3 className="font-bold text-sm uppercase mb-4">{editingProduct ? `Edit: ${editingProduct.title}` : "Add New Product"}</h3>
            <form action={async (formData) => { await upsertProduct(formData); setEditingProduct(null); }} className="space-y-4">
              {editingProduct && <input type="hidden" name="id" value={editingProduct.id} />}
              <input name="title" defaultValue={editingProduct?.title} placeholder="Title" required className="w-full border p-2 text-sm rounded" />
              <div className="grid grid-cols-2 gap-2">
                  <input name="price" defaultValue={editingProduct?.price} type="number" step="0.01" placeholder="Price $" required className="w-full border p-2 text-sm rounded" />
                  <input name="stock" defaultValue={editingProduct?.stock || 1} type="number" placeholder="Stock" required className="w-full border p-2 text-sm rounded" />
              </div>
              <select name="category" defaultValue={editingProduct?.category || "OIL"} className="w-full border p-2 text-sm rounded">
                  <option value="OIL">Oil</option>
                  <option value="ACRYLIC">Acrylic</option>
                  <option value="WATERCOLOR">Watercolor</option>
                  <option value="SKETCH">Sketch</option>
              </select>
              <textarea name="description" defaultValue={editingProduct?.description} placeholder="Description" rows={3} required className="w-full border p-2 text-sm rounded" />
              <div className="border border-dashed border-gray-300 p-4 rounded text-center">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">{editingProduct ? "Replace Image" : "Upload Image"}</label>
                  <input name="image" type="file" accept="image/*" required={!editingProduct} className="w-full text-xs" />
              </div>
              <div className="flex gap-2">
                {editingProduct && <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 bg-gray-200 text-xs font-bold py-3 uppercase">Cancel</button>}
                <button type="submit" className="flex-1 bg-black text-white text-xs font-bold py-3 uppercase">{editingProduct ? "Update" : "Add Product"}</button>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2 space-y-3">
            {products.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden">{p.images[0] && <Image src={p.images[0]} alt="" fill sizes="48px" className="object-cover" />}</div>
                  <div><p className="font-bold text-sm">{p.title}</p><p className="text-xs text-gray-500">${Number(p.price)} • Stock: {p.stock}</p></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingProduct(p)} className="text-xs bg-gray-100 px-3 py-1 rounded font-bold hover:bg-gray-200">EDIT</button>
                  <form action={deleteProduct}><input type="hidden" name="id" value={p.id} /><button className="text-xs text-red-500 hover:text-red-700 px-2 py-1">DELETE</button></form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === GALLERY SECTION === */}
      {activeTab === "GALLERY" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Create/Edit Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit border border-gray-100">
            <h3 className="font-bold text-sm uppercase mb-4">{editingGalleryItem ? `Edit: ${editingGalleryItem.title}` : "Add Gallery Item"}</h3>
            <form action={async (formData) => { await upsertGalleryItem(formData); setEditingGalleryItem(null); setDetectedSize("square"); }} className="space-y-4">
              {editingGalleryItem && <input type="hidden" name="id" value={editingGalleryItem.id} />}
              <input name="title" defaultValue={editingGalleryItem?.title} placeholder="Title" required className="w-full border p-2 text-sm rounded" />
              <input name="date" defaultValue={editingGalleryItem?.date} placeholder="Date (mm/yyyy)" required pattern="^(0[1-9]|1[0-2])\/\d{4}$" className="w-full border p-2 text-sm rounded" />
              {/* Size is auto-detected from image dimensions */}
              <input type="hidden" name="size" value={editingGalleryItem ? editingGalleryItem.size : detectedSize} />

              {/* 👇 NEW: Category Dropdown */}
              <select name="category" defaultValue={editingGalleryItem?.category || "MURALS_SPATIAL_ART"} className="w-full border p-2 text-sm rounded font-bold">
                  <option value="MURALS_SPATIAL_ART">Murals & Spatial Art</option>
                  <option value="CORPORATE_ART_EXPERIENCES">Corporate Art Experiences</option>
                  <option value="WEDDINGS_PRIVATE_EVENTS">Weddings & Private Events</option>
                  <option value="COMMISSIONED_CANVASES">Commissioned Canvases</option>
              </select>

              <select name="onHomepage" defaultValue={editingGalleryItem?.onHomepage ? "true" : "false"} className="w-full border p-2 text-sm rounded font-bold">
                  <option value="true">On Homepage (Y)</option>
                  <option value="false">Not on Homepage (N)</option>
              </select>

              <div className="border border-dashed border-gray-300 p-4 rounded text-center">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">{editingGalleryItem ? "Replace Image" : "Upload Image"}</label>
                  <input name="image" type="file" accept="image/*" required={!editingGalleryItem} className="w-full text-xs" onChange={handleImageChange} />
                  {!editingGalleryItem && (
                    <p className="text-[10px] text-gray-400 mt-2">
                      📐 Layout: <span className="font-bold capitalize text-gray-600">{detectedSize}</span> (auto-detected)
                    </p>
                  )}
              </div>
              <div className="flex gap-2">
                 {editingGalleryItem && <button type="button" onClick={() => setEditingGalleryItem(null)} className="flex-1 bg-gray-200 text-xs font-bold py-3 uppercase">Cancel</button>}
                <button className="flex-1 bg-blue-900 text-white text-xs font-bold py-3 uppercase">{editingGalleryItem ? "Update" : "Add to Gallery"}</button>
              </div>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2 grid grid-cols-3 md:grid-cols-4 gap-4">
             {galleryItems.map((item) => (
                 <div key={item.id} className="relative group aspect-square bg-gray-100 rounded overflow-hidden">
                     <Image src={item.src} alt={item.title} fill sizes="(max-width: 768px) 33vw, 25vw" className="object-cover" />
                     
                     {/* Overlay showing Category */}
                     <div className="absolute top-2 right-2 z-10">
                        <span className="text-[8px] bg-black text-white px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                            {item.category}
                        </span>
                     </div>

                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                         <p className="text-white text-xs text-center font-bold">{item.title}</p>
                         <div className="flex gap-2">
                            <button onClick={() => setEditingGalleryItem(item)} className="bg-white text-[10px] px-2 py-1 rounded uppercase font-bold">Edit</button>
                            <form action={deleteGalleryItem}>
                                <input type="hidden" name="id" value={item.id} />
                                <button className="bg-red-600 text-white text-[10px] px-2 py-1 rounded uppercase font-bold">Del</button>
                            </form>
                         </div>
                     </div>
                 </div>
             ))}
          </div>
        </div>
      )}

      {activeTab === "INQUIRIES" && (
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <div className="bg-white p-12 rounded-xl text-center text-gray-400 border border-gray-100 border-dashed">
              No inquiries yet.
            </div>
          ) : (
            inquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-white border border-gray-100 rounded-lg p-6 flex flex-col lg:flex-row gap-6 justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-bold uppercase tracking-widest">
                      {inquiry.inquiryType.replaceAll("_", " ")}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(inquiry.createdAt).toLocaleDateString("en-GB")}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg">{inquiry.name}</h3>
                  <p className="text-sm text-gray-500">{inquiry.email}</p>
                  {inquiry.company && (
                    <p className="text-sm text-gray-500 mt-1">{inquiry.company}</p>
                  )}

                  <p className="text-sm text-gray-700 mt-4 leading-relaxed whitespace-pre-wrap">
                    {inquiry.message}
                  </p>
                </div>

                <div className="min-w-[220px] flex flex-col gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Status
                  </span>
                  <form action={updateInquiryStatus}>
                    <input type="hidden" name="inquiryId" value={inquiry.id} />
                    <select
                      key={inquiry.status}
                      name="status"
                      defaultValue={inquiry.status}
                      className="w-full bg-gray-50 border border-gray-200 text-xs rounded p-2 cursor-pointer hover:border-black transition-colors"
                      onChange={(e) => e.target.form?.requestSubmit()}
                    >
                      <option value="NEW">New</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
