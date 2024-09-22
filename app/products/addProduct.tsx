'use client';

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [isMutating, setIsMutating] = useState(false);
    const [modal, setModal] = useState(false); // Menambahkan state untuk modal

    const router = useRouter();

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setIsMutating(true);
        await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                price: price,
            }),
        });
        setIsMutating(false);

        setTitle("");
        setPrice("");
        router.refresh();
        setModal(false);
    }

    function handleChange() {
        setModal(!modal);
    }

    return (
        <div>
            <button className="btn text-white" onClick={handleChange}>Add Product</button>

            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" style={{ display: 'none' }} />

            {modal && (
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Tambah Product</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label font-bold">Nama Product</label>
                                <input 
                                    type="text" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="input w-full input-bordered" 
                                    placeholder="Nama Product"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label font-bold">Harga</label>
                                <input
                                    type="text" 
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="input w-full input-bordered" 
                                    placeholder="Harga Product" 
                                />
                            </div>
                            <div className="modal-action">
                                <button type="button" className="btn" onClick={handleChange}>Close</button>
                                {!isMutating ? (
                                    <button type="submit" className="btn btn-primary">Save</button>
                                ) : (
                                    <button type="button" className="btn loading">Saving...</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
