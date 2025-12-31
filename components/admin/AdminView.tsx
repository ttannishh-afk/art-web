"use client";

import { useState } from "react";
import Image from "next/image";
import { upsertProduct, deleteProduct, upsertGalleryItem, deleteGalleryItem, updateOrderStatus } from "@/app/actions";

interface AdminViewProps {
  products: any[];
  galleryItems: any[];
  orders: any[];
}

export default function AdminView({ products, galleryItems, orders }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<"SHOP" | "GALLERY" | "ORDERS">("ORDERS");
  
  // 👇 NEW: Filter State
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PENDING" | "PAID" | "SHIPPED">("ALL");
  
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingGalleryItem, setEditingGalleryItem] = useState<any>(null);

  // Helper for Status Colors
  const getStatusColor = (status: string) => {
    switch(status) {
        case 'PAID': return 'bg-green-100 text-green-800 border-green-200';
        case 'SHIPPED': return 'bg-blue-100 text-blue-800 border-blue-200';
        default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  // 👇 NEW: Filter Logic
  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "ALL") return true;
    return order.status === filterStatus;
  });

  return (
    <div>
      {/* MAIN TABS */}
      <div className="flex gap-8 mb-8 border-b border-gray-200 pb-4">
        <button onClick={() => setActiveTab("ORDERS")} className={`text-sm font-bold tracking-widest uppercase ${activeTab === "ORDERS" ? "text-black border-b-2 border-black pb-4 -mb-4.5" : "text-gray-400"}`}>
          Orders ({orders.length})
        </button>
        <button onClick={() => setActiveTab("SHOP")} className={`text-sm font-bold tracking-widest uppercase ${activeTab === "SHOP" ? "text-black border-b-2 border-black pb-4 -mb-4.5" : "text-gray-400"}`}>
          Shop Inventory
        </button>
        <button onClick={() => setActiveTab("GALLERY")} className={`text-sm font-bold tracking-widest uppercase ${activeTab === "GALLERY" ? "text-black border-b-2 border-black pb-4 -mb-4.5" : "text-gray-400"}`}>
          Gallery
        </button>
      </div>

      {/* === ORDERS SECTION === */}
      {activeTab === "ORDERS" && (
        <div className="space-y-6">
            
            {/* 👇 NEW: Filter Pills */}
            <div className="flex gap-2">
                {["ALL", "PENDING", "PAID", "SHIPPED"].map((status) => {
                    // Calculate count for this specific filter
                    const count = status === "ALL" 
                        ? orders.length 
                        : orders.filter(o => o.status === status).length;

                    return (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status as any)}
                            className={`px-4 py-2 text-xs font-bold rounded-full border transition-all ${
                                filterStatus === status
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                            }`}
                        >
                            {status === "ALL" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()} 
                            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${
                                filterStatus === status ? "bg-white text-black" : "bg-gray-100 text-gray-600"
                            }`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
                <div className="bg-white p-12 rounded-xl text-center text-gray-400 border border-gray-100 border-dashed">
                    No {filterStatus !== "ALL" && filterStatus.toLowerCase()} orders found.
                </div>
            ) : (
                filteredOrders.map((order) => (
                    <div key={order.id} className="bg-white border border-gray-100 rounded-lg p-6 flex flex-col md:flex-row justify-between gap-6 hover:shadow-sm transition-shadow">
                        
                        {/* LEFT: Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-mono text-xs text-gray-400">#{order.id.slice(-6)}</span>
                                <span className="text-xs text-gray-400">
                                    • {new Date(order.createdAt).toLocaleDateString('en-GB')}
                                </span>
                                <span className={`text-[10px] px-2 py-0.5 rounded border font-bold uppercase ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                            <h3 className="font-bold text-sm mb-1">{order.user.name || "Guest"}</h3>
                            <p className="text-xs text-gray-500 mb-4">{order.user.email}</p>
                            
                            {/* Items */}
                            <div className="space-y-1">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-400">{item.quantity}x</span>
                                        <span>{item.product.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: Actions */}
                        <div className="flex flex-col items-end justify-between min-w-[200px]">
                            <p className="font-serif text-xl mb-4">${Number(order.total).toFixed(2)}</p>
                            
                            <form action={updateOrderStatus} className="flex items-center gap-2">
                                <input type="hidden" name="orderId" value={order.id} />
                                <select 
                                    key={order.status} // Forces React to refresh dropdown on change
                                    name="status" 
                                    defaultValue={order.status}
                                    className="bg-gray-50 border border-gray-200 text-xs rounded p-2 cursor-pointer hover:border-black transition-colors"
                                    onChange={(e) => e.target.form?.requestSubmit()}
                                >
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

      {/* === SHOP SECTION (Unchanged) === */}
      {activeTab === "SHOP" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Create/Edit Form */}
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

          {/* List */}
          <div className="lg:col-span-2 space-y-3">
            {products.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden">
                      {p.images[0] && <Image src={p.images[0]} alt="" fill className="object-cover" />}
                  </div>
                  <div>
                      <p className="font-bold text-sm">{p.title}</p>
                      <p className="text-xs text-gray-500">${Number(p.price)} • Stock: {p.stock}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingProduct(p)} className="text-xs bg-gray-100 px-3 py-1 rounded font-bold hover:bg-gray-200">EDIT</button>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={p.id} />
                    <button className="text-xs text-red-500 hover:text-red-700 px-2 py-1">DELETE</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === GALLERY SECTION (Unchanged) === */}
      {activeTab === "GALLERY" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Create/Edit Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit border border-gray-100">
            <h3 className="font-bold text-sm uppercase mb-4">{editingGalleryItem ? `Edit: ${editingGalleryItem.title}` : "Add Gallery Item"}</h3>
            <form action={async (formData) => { await upsertGalleryItem(formData); setEditingGalleryItem(null); }} className="space-y-4">
              {editingGalleryItem && <input type="hidden" name="id" value={editingGalleryItem.id} />}
              <input name="title" defaultValue={editingGalleryItem?.title} placeholder="Title" required className="w-full border p-2 text-sm rounded" />
              <div className="grid grid-cols-2 gap-2">
                  <input name="year" defaultValue={editingGalleryItem?.year} placeholder="Year" required className="w-full border p-2 text-sm rounded" />
                  <select name="size" defaultValue={editingGalleryItem?.size || "tall"} className="w-full border p-2 text-sm rounded">
                      <option value="tall">Tall</option>
                      <option value="wide">Wide</option>
                      <option value="square">Square</option>
                  </select>
              </div>
              <div className="border border-dashed border-gray-300 p-4 rounded text-center">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">{editingGalleryItem ? "Replace Image" : "Upload Image"}</label>
                  <input name="image" type="file" accept="image/*" required={!editingGalleryItem} className="w-full text-xs" />
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
                     <Image src={item.src} alt={item.title} fill className="object-cover" />
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
    </div>
  );
}