'use client'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Field, Label, Switch } from '@headlessui/react'
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios'


export default function Contact() {
  const [agreed, setAgreed] = useState(false)
  function isNumeric(str) {
    return !isNaN(str);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;

    setuserinpvalue({
      ...userinpvalue,
      [name]:value
    })
  }

  const [userinpvalue, setuserinpvalue] = useState({
    name: '',
    lastname: '',
    title: '',
    email: '',
    phone: '',
    message: ''
  })

  const submitForm = async (e) => {
    e.preventDefault();

    if(userinpvalue.name === '' || userinpvalue.email === '' || userinpvalue.title === '' || userinpvalue.phone === '' || userinpvalue.message === ''){
      toast.error('All fields are required !')
    }

    else if (!(userinpvalue.email).includes('@')){
      toast.error('Enter valid email !')
    }
    else if(!isNumeric(userinpvalue.phone)) {
      toast.error('Enter valid Phone no. !')
    }
    else if ( 11 <= userinpvalue.phone.length || userinpvalue.phone.length < 10) {
      toast.error('Enter valid Phone no. !')
    }
    else if (!agreed) {
      toast.error('Accept terms and conditions !')
    }
     else {

      const {name, email, phone, title, message} = userinpvalue;

      try {

        const res = await axios.post(`${process.env.REACT_APP_LIVE_URL}/contect-submit`, {
          name, email, phone, title, message
        })

        if(res.data.success && res.status === 200){
          toast.success(res.data.message)
          setuserinpvalue({
            ...userinpvalue,
            name: '',
            lastname: '',
            title: '',
            email: '',
            phone: '',
            message: ''
          })
          setAgreed(false)
        }
        else{
          toast.error(res.data.message)
        } 
        
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong, please try again.");
        }
      }
      
    }

  }

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Have an Issue releted to Orders, Payment, Registration then send your issues.
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="name"
                type="text"
                value={userinpvalue.name}
                onChange={handleChange}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="lastname"
                type="text"
                value={userinpvalue.lastname}
                onChange={handleChange}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
           </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              Title
            </label>
            <div className="mt-2.5">
              <input
                id="company"
                onChange={handleChange}
                name="title"
                value={userinpvalue.title}
                type="text"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
              onChange={handleChange}
              value={userinpvalue.email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
              Phone number
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>IN</option>
                  <option>US</option>
                  <option>AS</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                />
              </div>
              <input
                id="phone-number"
                value={userinpvalue.phone}
                name="phone"
                type="tel"
                onChange={handleChange}
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                value={userinpvalue.message}
                onChange={handleChange}
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
          </div>
          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="text-sm leading-6 text-gray-600">
              Accept terms and conditions{' '}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Label>
          </Field>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            onClick={submitForm}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  )
}
