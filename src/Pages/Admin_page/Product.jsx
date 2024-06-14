import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { Info, Wallet, X } from "lucide-react";
import AddProduct from "../ProductPage/AddProduct";
import Update_product from "./Update_product";

Modal.setAppElement("#root");

export default function Product() {
  const [product, setProduct] = useState([]);
  const [initial, setInitial] = useState([]);
  const BASE_URL = "https://ecommerce-backend-kl4l.onrender.com";

  const [modalOpen, setModalOpen] = useState({
    isShown: false,
    type: "message",
    data: null,
  });

  const fetch_products = async () => {
    // const response = await axios.get(
    //   "https://ecommerce-backend-kl4l.onrender.com/product/v1/products",
    //   { withCredentials: true } // Ensure cookies are sent with the request
    // );
    try {
      const response = await axios.get(`${BASE_URL}/product/v1/products`, 
        { withCredentials: true } 
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  const fetch_Product = async (id) => {
    try {
      const response = await axios.get(
        `https://ecommerce-backend-kl4l.onrender.com/product/v1/product/${id}`
      );
      setInitial(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const update_product = async (id) => {
    console.log(id);
    setModalOpen({ isShown: true, type: "message", data: null });
    fetch_Product(id);
  };

  useEffect(() => {
    fetch_products();
  }, []);

  return (
    <div className="max-h-full h-[800px] max-w-full overflow-x-auto">
      <h1 className="text-2xl font-semibold text-center py-2">
        Product Available: {product.length}{" "}
      </h1>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      size
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(product) && product.map((person, personIdx) => (
                    <tr key={person._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {person.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${person.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2">
                        {person.size.map((i, idx) => (
                          <span key={idx}>{i}</span>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => update_product(person._id)}
                          className="text-blue-600 hover:text-indigo-900"
                        >
                          Update
                        </button>
                        <ul className="flex gap-2">
                          <div id="root">
                            <Modal
                              isOpen={modalOpen.isShown}
                              onRequestClose={() => {}}
                              style={{
                                overlay: {
                                  backgroundColor: "rgba(0,0,0,0.2)",
                                },
                              }}
                              contentLabel=""
                              className="max-w-full w-[90%]  relative max-h-full overflow-y-auto overflow-x-auto h-[600px]  bg-white rounded-md mt-14 p-5 mx-auto"
                            >
                              <Update_product id={person._id} />
                              <button
                                onClick={() => {
                                  setModalOpen({
                                    isShown: false,
                                    type: "message",
                                    data: null,
                                  });
                                }}
                                className="absolute top-2 right-2"
                              >
                                <X />
                              </button>
                            </Modal>
                          </div>
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
