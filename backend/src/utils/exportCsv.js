import { parse } from 'json2csv';

export const generateCSV = (users) => {
  const fields = [
    { label: 'First Name', value: 'firstName' },
    { label: 'Last Name', value: 'lastName' },
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'Age', value: 'age' },
    { label: 'Gender', value: 'gender' },
    { label: 'Status', value: 'status' },
    { label: 'Address', value: 'address' },
    { label: 'Created At', value: (row) => row.createdAt ? new Date(row.createdAt).toISOString() : '' },
  ];

  const opts = { fields };
  return parse(users, opts);
};
