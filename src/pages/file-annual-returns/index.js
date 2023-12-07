import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SectionTitle from '../../components/section-title/index'
import setAuthToken from '../../functions/setAuthToken';
import axios from 'axios';
import url from '../../config/url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { ProcessorSpinner } from '../../components/spiner';

export default function Index() {
    const [selectedYear, setSelectedYear] = useState("")
    const router = useRouter()
    const [taxId, setTaxId] = useState('');
    const [validationResult, setValidationResult] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [tpkgtin, setTpKgtin] = useState("")
    const [tpOffice, setTpOffice] = useState("")
   




    const handleTaxIdChange = (e) => {
        const { value } = e.target;
        const onlyNumbers = value.replace(/[^0-9]/g, '');
        setTaxId(onlyNumbers);
    };



    setAuthToken()
    const validateTP = async (taxId) => {
        setIsFetching(true)
        try {
            const response = await axios.post(`${url.BASE_URL}taxpayer/view-taxpayers`, {
                KGTIN: taxId
            });
            setIsFetching(false)
      
     
            setValidationResult(response?.data.body.tp_name);
            setTpOffice(response?.data?.body?.tax_office)
            setTpKgtin(response?.data?.body?.KGTIN)
        } catch (error) {
            setIsFetching(false)
        
            if (error.response) {
                setValidationResult(error.response.data.message);
                setTpOffice("")
                setTpKgtin("")
            } else {
                console.error('Error occurred while validating Tax ID:', error);
            }
        }
    };

    useEffect(() => {
        if (taxId.length === 10) {
            validateTP(taxId);
        }

    }, [taxId]);




    const goToUploadcsv = () => {
        if (selectedYear === "" || tpkgtin === "" || tpOffice === "" ) {
            alert("Please provide year and taxpayer Id!")
        }
        else {
            router.push(`/uploads/annual?year=${selectedYear}&kgTin=${tpkgtin}&station=${tpOffice}`)
        }
    }
    const goToUploaddoc = () => {
        if (selectedYear === "" || tpkgtin === "" || tpOffice === "") {
            alert("Please provide year and taxpayer Id!")
        }
        else {
            router.push(`/uploads/annualdocs?year=${selectedYear}&kgtin=${tpkgtin}&station=${tpOffice}`)
        }
    }

    return (
        <>
            <ToastContainer />
            {isFetching && <ProcessorSpinner />}
            <div>
                <div className="overflow-x-auto my-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                    <div className="flex justify-center">
                        <div>
                            <SectionTitle
                                subtitle="File Annual Returns"
                            />
                        </div>
                    </div>
                    <form onSubmit={validateTP} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taxId">
                                Taxpayer ID:
                            </label>
                            <input
                                type="text"
                                id="taxId"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={taxId}
                                onChange={handleTaxIdChange}
                            />
                        </div>
                        {validationResult && (
                            <div>
                                <pre>{JSON.stringify(validationResult, null, 2)}</pre>
                            </div>
                        )}
                    </form>

                    <div className="flex justify-center">
                        <div>
                            <select required className="form-control mb-3 rounded" onChange={(e) => setSelectedYear(e.target.value)}>
                                <option value={""}>Please select Year</option>
                                <option value={"2019"}>2019</option>
                                <option value={"2020"}>2020</option>
                                <option value={"2021"}>2021</option>
                                <option value={"2022"}>2022</option>
                                <option value={"2023"}>2023</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <ul>
                            <li className="my-4 btn bg-purple-400 btn-default text-white btn-outlined bg-transparent rounded-md"><button  onClick={() => goToUploadcsv()} >Upload CSV Schedule</button></li>
                            <li className="my-4 btn bg-green-400 btn-default text-white btn-outlined bg-transparent rounded-md"><button  onClick={() => goToUploaddoc()}>Upload Supporting Documents</button></li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}
