import React, { useEffect, useState } from 'react'
import { ArrowRight, ChevronLeft, Info, Wallet, X } from 'lucide-react'
import Cart from './Cart'
import CheckOut_cart from './Chexkout_cart'
import { useGlobalContext } from '../../components/config/StateProvider'
import axios from 'axios'
import Modal from 'react-modal'
import toast from 'react-hot-toast'

Modal.setAppElement('#root');

export default function Check_out() {
  const [cartItems, setCartItems] = useState(null);
  const [user, setUser] = useState(null)
  const { cartinfo } = useGlobalContext()

  const [modalOpen, setModalOpen] = useState({
    isShown: false,
    type: "message",
    data: null
  });

  const userID = localStorage.getItem("userID");

  const fetch_user = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/auth/user/${userID}`);
      setUser(response.data.user_info.username)
      localStorage.setItem("user", response.data.user_info.cart.length);
      setCartItems(response.data.user_info.cart || []); // Ensure cart is set even if empty
    } catch (error) {
      console.log(error);
    }
  };

  const Handle_payment = () =>{
    toast.success("confirming payment, Please give some time ....");
    setModalOpen({ isShown: false, type: "message", data: null })
  }
  useEffect(() => {
    fetch_user();
  }, []);


  useEffect(() => {

  }, [cartinfo])
  const calculateTotal = () => {
    return cartItems && cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };
  const calculateTotal2 = () => {
    return cartItems && cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 5);
  };

  return (
    <div >
      <section className="flex flex-col lg:flex-row justify-between pt-10 w-[85%] mx-auto gap-4 h-screen">
        <div className='lg:w-[57%] h-full py-5 '>
          <div className='flex flex-col gap-4'>
            <h1 className='text-xl italic font-normal'>Hello, {user}</h1>
            <p className='text-4xl font-medium leading-6'>YOUR CART</p>
            <p className='text-xl flex items-center gap-2'>Total: <span className='text-sm'>[{cartItems?.length} items]</span> <span className='text-sm font-bold'>$ {calculateTotal()}</span></p>
            <p className='text-sm pb-2 italic'>Items in your cart are not reserved — check out now to make them yours.</p>
          </div>
          <div className='max-h-[400px] border h-[400px]  overflow-y-auto'>
            <CheckOut_cart />
          </div>
        </div>
        <div className='lg:w-[35%] h-full flex flex-col gap-16'>
          <div className='relative z-0'>
            <button className='w-full flex justify-between items-center absolute z-10 h-[50px] pr-2 hover:text-gray-500 py-2 text-start pl-4 bg-black font-semibold text-xl text-white'>Make Payments <span>
              <ArrowRight />
            </span>
            </button>
            <div className='border border-black absolute w-full top-1 left-1 z-0 h-[50px]' />
          </div>
          
          <ul className='flex gap-2'>
            
            <button onClick={() => {
              setModalOpen({ isShown: true, type: "message", data: null })
            }} className='flex  flex-col p-2 gap-2 items-center'>
              <Wallet color='blue' /> <span>Transfer to Bank</span>
            </button>
            {/* <button className='flex  flex-col p-2 gap-2 items-center'>
                    <Pico color='blue'/> <span>Transfer to Bank</span>
                  </button> */}
            <div id='root'>
              <Modal
                isOpen={modalOpen.isShown}
                onRequestClose={() => { }}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0,0,0,0.2)"
                  },

                }}
                contentLabel=''
                className="lg:w-[40%] w-full md:w-[70%] relative max-h-[400px]   h-[400px]  bg-white rounded-md mt-14 p-5 mx-auto">
                <div className='flex flex-col gap-4 pt-5'>
                  <div className='flex gap-2 items-center text-blue-600'><Info size={40}/> <h1 className='leading-relaxed'> Note: All transactions should be sent to the provided Bank details below, 
                    and the <span className='text-red-400 uppercase'>Remark</span> should be the product/items provided ID.</h1></div>
                    {/* ACCOUNT DETAILS */}
                    <div className='flex flex-col items-center w-full justify-center'>
                      <h1 className='text-3xl font-bold'>7088135057</h1>
                      <p>Opay Bank</p>
                      <p>Effiong Michael ikem</p>
                    </div>
                    {/* PRODUCT IS */}
                    <div className='flex flex-col items-center w-full justify-center'>
                      <h1 className='text-3xl font-bold'>Ee55tg663j39</h1>
                      <p>Product / Transaction ID</p>
                    </div>
                    {/* CONFRIM BUTTON */}
                    <div className='flex justify-center items-center'>
                      <button
                      onClick={Handle_payment}
                       className='px-5 py-2 bg-green-600 text-white drop-shadow-lg rounded-xl'>Confirm Payment</button>
                    </div>
                </div>
                <button onClick={() => {
                  setModalOpen({ isShown: false, type: "message", data: null })
                }} className='absolute top-2 right-2'><X /></button>
              </Modal>
            </div>

          </ul>
          <div>
            <h1 className='uppercase text-2xl'>Order summary</h1>
            <ul className='w-full py-5 gap-2 flex flex-col'>
              <li className='LiStyles'>{cartItems?.length} items <span>${calculateTotal()}</span></li>
              <li className='LiStyles'>Sales Tax <span>$5</span></li>
              <li className='LiStyles'>Delivery Fee <span>Free</span></li>
              <li className='LiStyles font-bold pt-2'>Total <span>${calculateTotal2()}</span></li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  )
}
