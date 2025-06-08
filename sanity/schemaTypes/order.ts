import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'userEmail',
      title: 'User Email',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Ordered Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'price', type: 'number', title: 'Price'},
            {name: 'quantity', type: 'number', title: 'Quantity'},
            {name: 'productId', type: 'string', title: 'Product ID'},
          ],
        },
      ],
    }),
    defineField({
      name: 'total',
      title: 'Total Price',
      type: 'number',
    }),
    defineField({
      name: 'Status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Order', 'Paid', 'canceled'],
      },
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
