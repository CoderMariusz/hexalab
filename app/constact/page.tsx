'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      console.log(form);
      setSent(true);
    }
  };

  return (
    <main className='max-w-3xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold mb-6'>Contact Us</h1>

      {sent ? (
        <p className='text-green-600 font-semibold'>
          Message sent successfully!
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className='space-y-4'>
          <input
            type='text'
            name='name'
            placeholder='Your Name'
            className='w-full p-3 border rounded'
            onChange={handleChange}
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Your Email'
            className='w-full p-3 border rounded'
            onChange={handleChange}
            required
          />
          <textarea
            name='message'
            rows={5}
            placeholder='Your Message'
            className='w-full p-3 border rounded'
            onChange={handleChange}
            required
          />
          <button
            type='submit'
            className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'>
            Send Message
          </button>
        </form>
      )}
    </main>
  );
}
