import React from 'react'
import { formatNumber } from '../../functions/numbers';
import Widget from '../widget';


function AnnulCsv({ remittance, total }) {
  const items = remittance;
  console.log("items", items);
  const singleFields = [
    // { name: 'Status', key: 'status' },
    {
      name: 'Staff Name',
      key: 'staff_names',
    },
    {
      name: 'Number of months',
      key: 'no_months',
    },
    {
      name: 'Basic Salary',
      key: 'basic_salary',
    },
    {
      name: 'CONSOLIDATED RELIEF ALLOWANCE',
      key: 'con_rel_cal',
    },
    {
      name: 'Pension',
      key: 'pension',
    },
    {
      name: 'NHIS',
      key: 'nhis',
    },

    {
      name: 'LAP',
      key: 'lap',
    },

    {
      name: 'Net Tax Deducted',
      key: 'net_tax_ded',
    },
    {
      name: 'Expected Tax',
      key: 'tax_pay_cal',
    },
    {
      name: 'Variance',
      key: 'variance_cal',
    },

    {
      name: 'Year',
      key: 'year',
    },
  ];

  return (
    <>
      <Widget>
        <div className="overflow-x-auto">
          <table className="table divide-y">
            <thead className="">
              <tr className="font-semibold text-blue-400">
                {singleFields.map((field, i) => (
                  <th key={i} className="">
                    {field.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((remittance, i) => (
                <tr key={i} className="">
                  {singleFields.map((field, j) => (
                    <td key={j} className="">
                      {remittance[field.key]}
                    </td>
                  ))}
                </tr>
              ))}
              {items.length > 0 && (
                <tr className="font-semibold">
                  <td></td>
                  <td></td>
                  <td>{formatNumber(total.totalSalary)}</td>
                  <td>{formatNumber(total.totalConRel)}</td>
                  <td>{formatNumber(total.totalPension)}</td>
                  <td>{formatNumber(total.totalNHIS)}</td>
                  <td>{formatNumber(total.totalLAP)}</td>
                  <td>{formatNumber(total.totalNetTax)}</td>
                  <td>{formatNumber(total.totalExpTax)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Widget>
    </>
  );
};

export default AnnulCsv