import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import setAuthToken from '../../functions/setAuthToken';
import url from '../../config/url';
import axios from "axios";
import Loader from 'react-loader-spinner';
import SectionTitle from '../../components/section-title';
import { useForm } from 'react-hook-form';
import { FormatMoneyComponentReport } from '../../components/FormInput/formInputs';
import { formatNumber } from '../../functions/numbers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiTrash } from 'react-icons/fi';

export default function Revise() {
  const [payerDetails, setpayerDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(() => false);
  const [routerAssId, setAssessId] = useState('');
  const [fixedValues, fixValues] = useState({ amount: "" });
  const [appLetter, setAppLetter] = useState(null);
  const [supportingDoc, setSupportingDoc] = useState(null);
  const [uploadedAppLetter, setUploadedAppLetter] = useState(false);
  const [uploadErrors, setUploadErrors] = useState(() => []);
  const [supportDocInput, setInput] = useState({ name: '' })
  const [uploadDep, setUploadDep] = useState(false);
  const [hidesubmit, setHideSubmit] = useState("");
  const [togglesubmitobjection, setTogglesubmitobjection] = useState("hidden");
  const router = useRouter();

  const [uploadedDocs, setUploadedDocs] = useState([]);
  // const [serviceList, setServiceList] = useState([{ service: "" }]);

  // const handleServiceChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...uploadedDocs];
  //   list[index][name] = value;
  //   setUploadedDocs(list);
  // };


  const handleServiceRemove = (index) => {
    setIsFetching(true)
    const list = [...uploadedDocs];
    let fileName = list[index].file_name;
    let uploadFile = {
      file_name: fileName
    }
    axios.delete(`${url.BASE_URL}forma/objection-upload`, {data: uploadFile})
    .then(function (response) {
      setIsFetching(false)
      toast.success("Deleted Successfully!");
      setUploadDep(!uploadDep)
    })
    .catch(function (error) {
        console.log("fileName", fileName);
        setIsFetching(false)
        if (error) {
          toast.error("Cannot Delete Document");
        } else {
          toast.error("Failed! Try again");

        }

      })

  };



  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()


  const handleChange = (e) => setInput({
    ...supportDocInput,
    [e.currentTarget.name]: e.currentTarget.value
  });


  setAuthToken();
  useEffect(() => {
    if (router && router.query) {
      let routerData = String(router.query.ref);
      let kgtin = routerData.split('_').shift()
      let assessId = routerData.split('_').pop()
      setAssessId(assessId)
      const fetchPost = async () => {
        setIsFetching(true)
        await axios.post(`${url.BASE_URL}taxpayer/view-taxpayers`, { KGTIN: kgtin })
          .then(function (response) {
            let IndData = response.data.body
            setIsFetching(false);
            setpayerDetails(IndData)
            axios.post(`${url.BASE_URL}forma/view-objection`, { assessment_id: assessId })
              .then(function (response) {
                setUploadedDocs(response.data.body.objUpload)
              }).catch(function (error) {
                console.log(error);
              })
          }).catch(function (error) {
            setIsFetching(false);
            console.log(error);
          })

      };
      fetchPost();
    }
  }, [router, uploadDep]);


  const InitiateObj = async (data) => {
    setIsFetching(true)
    data.income = fixedValues.amount
    data.tp_tax = finalTax
    await axios.put(`${url.BASE_URL}forma/objection`, data)
      .then(function (response) {
        setIsFetching(false)
        setHideSubmit("hidden")
        setTogglesubmitobjection("")
        toast.success("Created Successfully!");
      })
      .catch(function (error) {
        setIsFetching(false)
        if (error) {
          toast.error("Cannot Update Objection");
        } else {
          toast.error("Failed! Try again");

        }

      })

  }


  const onChangeAppLetter = e => {
    let file = e.target.files[0]
    console.log(file);
    if (file) {
      if (!file) {
        setAppLetter(null);
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setAppLetter(null);
        return;
      }
      if (file.size > 1024 * 100) {
        alert("file too large..file size shoulde not exceed 100kb");
        return
      }

      else {
        setAppLetter(file);
      }
    }
  };

  const onChangeSupportingDoc = e => {
    let file = e.target.files[0]
    console.log(file);
    if (file) {
      if (!file) {
        setSupportingDoc(null);
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setSupportingDoc(null);
        return;
      }
      if (file.size > 1024 * 100) {
        alert("file too large..file size shoulde not exceed 100kb");
        return
      }

      else {
        setSupportingDoc(file);
      }
    }
  };


  const UploadAppLetter = async () => {
    setIsFetching(true)
    const formData = new FormData();
    formData.append('assessment_id', routerAssId);
    formData.append('doc_name', 'Application letter');
    formData.append('file_name', appLetter);
    try {
      const res = await axios.post(`${url.BASE_URL}forma/objection-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setIsFetching(false)
      setUploadedAppLetter(true);
      toast.success("Upload Successful!")
      // setAppLetter(null);
      setUploadDep(!uploadDep)
    } catch (error) {
      // setAppLetter(null);
      setUploadedAppLetter(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedAppLetter(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  const UploadSupportingDocs = async () => {
    setIsFetching(true)
    const formData = new FormData();
    formData.append('assessment_id', routerAssId);
    formData.append('doc_name', supportDocInput.name);
    formData.append('file_name', supportingDoc);
    try {
      const res = await axios.post(`${url.BASE_URL}forma/objection-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setIsFetching(false)
      // setSupportingDoc(null)
      setInput({ name: '' });
      toast.success("Upload Successful!")
      setUploadDep(!uploadDep)
    } catch (error) {
      setIsFetching(false)
      setInput({ name: '' });
      // setSupportingDoc(null)
      if (error.response) {
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  const SubmitObjection = (e) => {
    e.preventDefault()
    axios.put(`${url.BASE_URL}forma/objection`, { assessment_id: routerAssId, status: "Submitted" })
      .then(function (response) {
        setIsFetching(false)
        toast.success("Submitted Successfully!");
        router.push("/view/objection/submitted")
      })
      .catch(function (error) {
        setIsFetching(false)
        if (error) {
          toast.error("Cannot Submit Objection");
        } else {
          toast.error("Failed! Try again");

        }

      })

  }




  let incomeInput = watch("income", "")

  let incomeFigure = incomeInput.replace(/,/g, '')

  //taxcal
  let tax;
  let tax_paid;

  ///TAX CAL


  let consolidatedRelief;
  let chargeableIncome;
  let totalRelief;
  let totalDeduction;
  let consolidatedIncome

  consolidatedIncome = Number(incomeFigure);

  totalRelief = 0;
  let gross_inc = consolidatedIncome - totalRelief;

  // console.log(gross_inc, ' gross')


  if (consolidatedIncome < 300000.0) {
    consolidatedRelief = 0;
    //console.log(gross_inc);
  } else {
    consolidatedRelief = 200000 + 0.2 * gross_inc;
    // console.log("Gross INC", gross_inc);
  }

  totalDeduction = consolidatedRelief + totalRelief;
  chargeableIncome = consolidatedIncome - totalDeduction;

  //calculate tax
  if (consolidatedIncome <= 300000.0) {
    tax = consolidatedIncome * 0.01;

    //console.log(tax+' 1');
  } else if (consolidatedIncome > 300000 && chargeableIncome < 300000) {
    tax = (chargeableIncome * 0.07);
    let taxS = (consolidatedIncome * 0.01);
    if (tax > taxS) {
      tax = tax
    }
    else {
      tax = taxS;
    }
    //console.log(tax+' tax2');
  } else if (chargeableIncome > 300000 && chargeableIncome <= 600000) {
    tax = 300000 * 0.07 + (chargeableIncome - 300000) * 0.11;

    //console.log(tax+' tax3');
  } else if (chargeableIncome > 600000 && chargeableIncome <= 1100000) {
    tax = 300000 * 0.07 + 300000 * 0.11 + (chargeableIncome - 600000) * 0.15;

    //console.log(tax + ' 4');
  } else if (chargeableIncome > 1100000 && chargeableIncome <= 1600000) {
    tax =
      300000 * 0.07 +
      300000 * 0.11 +
      500000 * 0.15 +
      (chargeableIncome - 1100000) * 0.19;

    //console.log(tax + ' 5');
  } else if (chargeableIncome > 1600000 && chargeableIncome <= 3200000) {
    tax =
      300000 * 0.07 +
      300000 * 0.11 +
      500000 * 0.15 +
      500000 * 0.19 +
      (chargeableIncome - 1600000) * 0.21;

    //console.log(tax + ' 6');
  } else if (chargeableIncome > 3200000) {
    tax =
      300000 * 0.07 +
      300000 * 0.11 +
      500000 * 0.15 +
      500000 * 0.19 +
      1600000 * 0.21 +
      (chargeableIncome - 3200000) * 0.24;

    //console.log(tax + ' 7');
  }

  tax = tax;

  tax_paid = tax;

  let JsonTax = String(tax_paid)

  let finalTax = Number(JsonTax)

  let TotalIncome = Number(incomeFigure)


  return (
    <>
      <ToastContainer />
      <SectionTitle subtitle="Create Revised Assessment" />

      <div className="border mb-3 block p-8 rounded-lg bg-white w-full">
        <div className="flex">
          <h6 className="p-2">Taxpayer Information</h6>
        </div>
        <p className="mb-3 font-bold"></p>
        <div>
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <p>Name</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.tp_name} disabled />
            </div>

            <div className="form-group mb-6">
              <p>KGTIN</p>

              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.KGTIN} disabled />
            </div>

            <div className="form-group mb-6">
              <p>Email</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.email} disabled />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="form-group mb-6">
              <p>Phone</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.phone_number} disabled />
            </div>

            <div className="form-group mb-6">
              <p>Tax Office</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.tax_office} disabled />
            </div>
            <div className="form-group mb-6">
              <p>Taxpayer Type</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.tp_type} disabled />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <p>Address</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.address} disabled />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        {isFetching && (
          <div className="flex justify-center item mb-2">
            <Loader
              visible={isFetching}
              type="BallTriangle"
              color="#00FA9A"
              height={19}
              width={19}
              timeout={0}
              className="ml-2"
            />
            <p>Please wait...</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
          <div className="w-full lg:w-1/2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
            <form onSubmit={handleSubmit(InitiateObj)}>
              <div className="mb-2">
                <input type="text" defaultValue={routerAssId} readOnly ref={register()} name="assessment_id" className="form-control hidden w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="mb-2">
                <label> Reason for Objection</label>
                <textarea type="text" required name="grounds" ref={register()} className="form-control w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="">
                <hr />
              </div>

              <div className="my-2 grid grid-cols-2 gap-2">
                <label className="self-center">Actual Income:</label>
                <FormatMoneyComponentReport
                  ref={register()}
                  name="income"
                  control={control}
                  defaultValue={""}
                  onValueChange={(v) => fixValues({ amount: v })}
                  placeholder="₦ Enter Income"
                  required={true}
                />
              </div>
              <div className="mb-2 grid grid-cols-2 gap-2">
                <label className="self-center font-bold">Total Income:</label>
                <p className="font-bold">{formatNumber(TotalIncome)}</p>
              </div>
              <div className="mb-2 grid grid-cols-2 gap-2">
                <label className="self-center font-bold">Tax:</label>
                <p className="font-bold">{formatNumber(JsonTax)}</p>
              </div>
              <div className="mb-2 grid grid-cols-2 gap-2">
                <label className="self-center font-bold"> Tax liability:</label>
                <p className="font-bold">{formatNumber(finalTax)}</p>
              </div>
              <div className={`flex justify-end ${hidesubmit}`}>
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>


          <div className="w-full lg:w-1/2 ">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
              <div className=" mb-5">
                <p className="font-bold text-center">Upload Supporting Documents</p>
                <p className="text-center"><small className="font-bold">(Accepted document formats are png, jpeg, pdf. max size 100kb)</small></p>
              </div>

              <form>
                {uploadedDocs.map((singleFile, index) => (
                  <div key={index} className="flex justify-between my-3" >
                    <p className="font-bold">{singleFile.doc_name}</p>
                    <input type="text" name="file_name" defaultValue={singleFile.file_name} className="hidden" />
                    <button className=" text-white flex items-center justify-center  text-lg font-display font-bold"
                      type="button"
                      onClick={() => handleServiceRemove(index)}
                    >
                      <FiTrash
                        size={15}
                        className=" text-red-500"
                      />

                    </button>
                  </div>
                ))}
              </form>

              <hr />
              <form onSubmit={handleSubmit(UploadAppLetter)}>
                <div className="flex justify-between mt-3 mb-5">
                  <p className="font-bold">Application letter </p>
                  <input
                    type="file"
                    className="hidden"
                    id='customFile'
                    onChange={onChangeAppLetter}
                    onClick={(e) => (e.target.value = null)}
                    required
                  />

                  <div className="flex justify-evenly">
                    <label
                      htmlFor='customFile'
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                    >
                      Select File
                    </label>

                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                      type="submit"
                    >
                      Upload
                    </button>

                  </div>
                </div>
                <p className="self-center">{appLetter ? appLetter.name : ""}</p>
              </form>
              <hr />
              <p className="font-bold flex justify-center my-3">Other Documents</p>
              <form onSubmit={handleSubmit(UploadSupportingDocs)}>
                <div className="flex justify-between mb-5">
                  <input type="text" name="name" minlength="5" maxlength="50" required value={supportDocInput.name} onChange={handleChange} placeholder="Enter document name" />
                  <input
                    type="file"
                    className="hidden"
                    id='customFile2'
                    name="supporting_doc"
                    onChange={onChangeSupportingDoc}
                    onClick={(e) => (e.target.value = null)}
                    required
                  />
                  <div className="flex justify-evenly">
                    <label
                      htmlFor='customFile2'
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                    >
                      Select File
                    </label>

                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                      type="submit"
                    >
                      Upload
                    </button>

                  </div>
                </div>
                <p className="self-center">{supportingDoc ? supportingDoc.name : ""}</p>
              </form>

            </div>
          </div>
        </div>

      </div>

      <form className={`my-4 flex justify-center ${togglesubmitobjection}`} onSubmit={SubmitObjection}>
        <button className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
          type="submit"
        >
          Submit Objection
        </button>
      </form>
    </>
  )
}
