import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";

type Product = {
    id: number;
    title: string;
    price: number;
}

async function getProducts() {
    const res = await fetch('http://localhost:5000/products', {
        cache: 'no-store'
    });
    return res.json();
}

export default async function ProductList() {
    const products: Product[] = await getProducts();
    return (
        <div className="py-10 px-4 sm:px-10">
            <div className="py-2">
                <AddProduct />
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-white text-black">
                            <th className="text-left">#</th>
                            <th className="text-left">Product Name</th>
                            <th className="text-left">Price</th>
                            <th className="text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id} className="">
                                <td>{index + 1}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td className="flex space-x-2">
                                    <UpdateProduct {...product} />
                                    <DeleteProduct {...product} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
