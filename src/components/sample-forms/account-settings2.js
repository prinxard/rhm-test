import React, {useEffect, useState} from 'react'
import url from "../../config/url";
import axios from 'axios';
import Validation from '../forms/validation'
import Alert from '../alerts'
import setAuthToken from '../../functions/setAuthToken';
import FormValidation2 from '../forms/validation2';

const AccountSettings2 = ({message = null}) => {
  const [data, onSubmit] = useState(null)
  const [details, setDetails] = useState('');
  setAuthToken();
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const result = await axios.get(`${url.BASE_URL}user/view-user`);
        let userDet = result.data.body.taxpayerDetails;
        setDetails(userDet);
        
        console.log(details);
        // console.log(userDet);
      } catch (error) {
        console.log('Error', error);
      }
    };
    fetchInfo();
  }, []);
  
  let items = [
    {
     
      label: 'KGTIN',
      error: {required: 'Please enter a valid first name'},
      name: 'first-name',
      type: 'text',
      placeholder: `${details.KGTIN}`
    },
    {
      label: 'Taxpayer Name',
      error: {required: 'Please enter a valid last name'},
      name: 'last-name',
      type: 'text',
      placeholder: `${details.tp_name}`
    },
    {
      label: 'TaxPayer Type',
      error: {required: 'Please enter a valid last name'},
      name: 'last-name',
      type: 'text',
      placeholder: `${details.tp_type}`
    },
    {
      label: 'Email address',
      error: {required: 'Please enter a valid email address'},
      name: 'email',
      type: 'email',
      placeholder: `${details.email}`
    },
    {
      label: 'Phone number',
      error: {required: 'Please enter a valid company'},
      name: 'company',
      type: 'text',
      placeholder: `${details.phone_number}`
    },
    {
      label: 'Tax office',
      error: {required: 'Please enter a valid position'},
      name: 'position',
      type: 'text',
      placeholder: `${details.tax_office}`
    },
    // {
    //   label: 'Language',
    //   error: {
    //     required: 'Language is required',
    //     validate: value =>
    //       ['english', 'spanish', 'portuguese'].includes(value) ||
    //       'Language is required'
    //   },
    //   name: 'language',
    //   type: 'select',
    //   options: [
    //     {value: null, label: 'Select language'},
    //     {value: 'english', label: 'English'},
    //     {value: 'spanish', label: 'Spanish'},
    //     {value: 'portuguese', label: 'Portuguese'}
    //   ]
    // }
  ]
  return (
    <>
      <div className="flex flex-col">
        {data && message && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-green-500 text-green-500"
              borderLeft
              raised>
              {message}
            </Alert>
          </div>
        )}
        <FormValidation2 items={items} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export default AccountSettings2
