import { getBill, createBill, getBills, deleteBill, updateBill } from '../controllers/bills.controllers.js';

export const billsRoutes = () => [
  {
    url: '/:id',
    method: 'GET',
    handler: getBill
  },
  {
    url: '/',
    method: 'GET',
    handler: getBills
  },
  {
    url: '/',
    method: 'POST',
    handler: createBill
  },
  {
    url: '/:id',
    method: 'DELETE',
    handler: deleteBill
  },
  {
    url: '/:id',
    method: 'PATCH',
    handler: updateBill
  },

];