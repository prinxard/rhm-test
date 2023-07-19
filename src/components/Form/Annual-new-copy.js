import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, shallowEqual } from 'react-redux';
import Widget from '../widget';
import axios from 'axios';
import url from '../../config/url';
import { FiX, FiCheck } from 'react-icons/fi';
import setAuthToken from '../../functions/setAuthToken';
import { ProcessorSpinner } from '../spiner/index';

const AnnualCSVUploadForm = () => {
  //handle file
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);
  const [file6, setFile6] = useState(null);
  const [file7, setFile7] = useState(null);
  const [file8, setFile8] = useState(null);
  const [file9, setFile9] = useState(null);
  const [file10, setFile10] = useState(null);
  const [file11, setFile11] = useState(null);
  const [file12, setFile12] = useState(null);
  const [file13, setFile13] = useState(null);
  const [file14, setFile14] = useState(null);
  const [file15, setFile15] = useState(null);
  const [file16, setFile16] = useState(null);
  const [file17, setFile17] = useState(null);
  const [file18, setFile18] = useState(null);
  const [uploadErrors, setUploadErrors] = useState(() => []);
  const [submitting, setSubmitting] = useState(() => false);
  const [disabled, setDisabled] = useState(true);
  const [disabled2, setDisabled2] = useState(true);
  const [disabled3, setDisabled3] = useState(true);
  const [disabled4, setDisabled4] = useState(true);
  const [disabled5, setDisabled5] = useState(true);
  const [disabled6, setDisabled6] = useState(true);
  const [disabled7, setDisabled7] = useState(true);
  const [disabled8, setDisabled8] = useState(true);
  const [disabled9, setDisabled9] = useState(true);
  const [disabled10, setDisabled10] = useState(true);
  const [disabled11, setDisabled11] = useState(true);
  const [disabled12, setDisabled12] = useState(true);
  const [disabled13, setDisabled13] = useState(true);
  const [disabled14, setDisabled14] = useState(true);
  const [disabled15, setDisabled15] = useState(true);
  const [disabled16, setDisabled16] = useState(true);
  const [disabled17, setDisabled17] = useState(true);
  const [disabled18, setDisabled18] = useState(true);
  const modalRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [uploadSuccessful, setUploadSuccessful] = useState(() => false);
  const [uploadSuccessful2, setUploadSuccessful2] = useState(() => false);
  const [uploadSuccessful3, setUploadSuccessful3] = useState(() => false);
  const [uploadSuccessful4, setUploadSuccessful4] = useState(() => false);
  const [uploadSuccessful5, setUploadSuccessful5] = useState(() => false);
  const [uploadSuccessful6, setUploadSuccessful6] = useState(() => false);
  const [uploadSuccessful7, setUploadSuccessful7] = useState(() => false);
  const [uploadSuccessful8, setUploadSuccessful8] = useState(() => false);
  const [uploadSuccessful9, setUploadSuccessful9] = useState(() => false);
  const [uploadSuccessful10, setUploadSuccessful10] = useState(() => false);
  const [uploadSuccessful11, setUploadSuccessful11] = useState(() => false);
  const [uploadSuccessful12, setUploadSuccessful12] = useState(() => false);
  const [uploadSuccessful13, setUploadSuccessful13] = useState(() => false);
  const [uploadSuccessful14, setUploadSuccessful14] = useState(() => false);
  const [uploadSuccessful15, setUploadSuccessful15] = useState(() => false);
  const [uploadSuccessful16, setUploadSuccessful16] = useState(() => false);
  const [uploadSuccessful17, setUploadSuccessful17] = useState(() => false);
  const [uploadSuccessful18, setUploadSuccessful18] = useState(() => false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const { register, handleSubmit } = useForm();

  const { palettes } = useSelector(
    (state) => ({
      palettes: state.palettes,
    }),
    shallowEqual
  );
  let { background } = {
    ...palettes,
  };

  const show = () => {
    setOpen(true);
  };
  const hide = () => {
    setOpen(false);
    setUploadErrors([]);
    // setUploadSuccessful(false);
    setUploadSuccessful(true);
    if (uploadSuccessful) {
      // router.push('/view/monthly');
    }
  };
  const hide2 = () => {
    setOpen(false);
    setUploadErrors([]);
    // setUploadSuccessful(false);
    setUploadSuccessful2(true);
    if (uploadSuccessful2) {
      // router.push('/view/monthly');
    }
  };
  const hide3 = () => {
    setOpen(false);
    setUploadErrors([]);
    // setUploadSuccessful(false);
    setUploadSuccessful3(true);
    if (uploadSuccessful3) {
      // router.push('/view/monthly');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!modalRef || !modalRef.current) return false;
      if (!open || modalRef.current.contains(event.target)) {
        return false;
      }
      setOpen(!open);
      setUploadErrors(() => []);
      if (uploadSuccessful) {
        // router.push('/view/monthly');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, modalRef]);

  const fileInputRef = useRef();
  const fileHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file) {
        setFile(null);
        setDisabled(true);
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFile(null);
        setDisabled(true);
        return;
      }
      if (file.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile(file);
        setDisabled(false);
      }
    } else {
      setFile("no file chosen yet");
    }
  };

  const fileInputRef2 = useRef();
  const fileHandler2 = (event) => {
    const file2 = event.target.files[0];
    if (file2) {
      if (!file2) {
        setFile2(null);
        setDisabled2(true);
        return;
      }
      if (file2.type !== "image/jpeg" && file2.type !== "application/pdf" && file2.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFile2(null);
        setDisabled2(true);
        return;
      }
      if (file2.size > 1024 * 200) {
        alert("file too large..file size should not exceed 200kb");
        return
      }
      else {
        setFile2(file2);
        setDisabled2(false);
      }
    } else {
      setFile2("no file chosen yet");
    }
  };

  const fileInputRef3 = useRef();
  const fileHandler3 = (event) => {
    const file3 = event.target.files[0];
    if (file3) {
      if (!file3) {
        setFile3(null);
        setDisabled3(true);
        return;
      }
      if (file3.type !== "image/jpeg" && file3.type !== "application/pdf" && file3.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFile3(null);
        setDisabled3(true);
        return;
      }
      if (file3.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile3(file3);
        setDisabled3(false);
      }
    } else {
      setFile3("no file chosen yet");
    }
  };

  const handleUpload = async (data) => {
    let employer_id = 1004124549
    const formData = new FormData();
    formData.append('employer_id', employer_id);
    formData.append('cover_letter', file);

    setAuthToken();
    setSubmitting(() => true);
    try {
      await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (ProgressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            )
          );
        },
      });
      setUploadPercentage(0);
      setFile(null);
      setDisabled(true);
      setSubmitting(() => false);
      setUploadSuccessful(() => true);
      show();
      console.log(data.response.body);
    } catch (error) {
      setUploadPercentage(0);
      setFile(null);
      setDisabled(true);
      setSubmitting(false);
      if (error.response) {
        console.log(error.response.data);
        setUploadErrors(() => error.response.data.body);
        show();
      }
    }
  };
  const handleUpload2 = async (data) => {
    let employer_id = 1004124549
    const formData = new FormData();
    formData.append('employer_id', employer_id);
    formData.append('indv_return_letter', file2);

    setAuthToken();
    setSubmitting(() => true);
    try {
      await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (ProgressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            )
          );
        },
      });
      setUploadPercentage(0);
      setFile2(null);
      setDisabled2(true);
      setSubmitting(() => false);
      setUploadSuccessful2(() => true);
      show();
      console.log(data.response.body);
    } catch (error) {
      setUploadPercentage(0);
      setFile2(null);
      setDisabled2(true);
      setSubmitting(false);
      if (error.response) {
        console.log(error.response.data);
        setUploadErrors(() => error.response.data.body);
        show();
      }
    }
  };

  const handleUpload3 = async (data) => {
    let employer_id = 1004124549
    const formData = new FormData();
    formData.append('employer_id', employer_id);
    formData.append('indv_return_letter', file3);

    setAuthToken();
    setSubmitting(() => true);
    try {
      await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (ProgressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            )
          );
        },
      });
      setUploadPercentage(0);
      setFile3(null);
      setDisabled3(true);
      setSubmitting(() => false);
      setUploadSuccessful3(() => true);
      show();
      console.log(data.response.body);
    } catch (error) {
      setUploadPercentage(0);
      setFile3(null);
      setDisabled3(true);
      setSubmitting(false);
      if (error.response) {
        console.log(error.response.data);
        setUploadErrors(() => error.response.data.body);
        show();
      }
    }
  };

  return (
    <>
      {submitting && (
        <ProcessorSpinner
          visible={true}
          text={`${uploadPercentage === 0
            ? 'Uploading...'
            : uploadPercentage === 100
              ? 'Processing...'
              : null
            }`}
        />
      )}

      {/* <TokenModalsOverlay>
        <TokenModals />
      </TokenModalsOverlay> */}
      <h6 className="p-2 font-bold">Correspondence</h6>
      <Widget>
        <div>
          <form onSubmit={handleSubmit(handleUpload)}>
            <div className="flex justify-between mb-5">
              <p>Cover letter of submission of annual returns <span className="font-bold" style={{ color: "red" }}> * </span><small>(pdf, jpg, png)</small> </p>
              <input
                required
                type="file"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
                onClick={(e) => (e.target.value = null)}
              />
              <div className="flex justify-evenly">

                <p >{file ? file.name : ""}</p>

                <button style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  onClick={(event) => {
                    event.preventDefault();
                    fileInputRef.current.click();
                  }}
                >
                  select file
                </button>
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                  disabled={disabled}>
                  Submit
                </button>
                {uploadSuccessful ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}
              </div>
            </div>
          </form>

          <hr className="mb-2" />

          <form onSubmit={handleSubmit(handleUpload2)}>
            <div className="flex justify-between mb-5">
              <p>Copy of letter mandating employees to file individual tax returns <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small></p>
              <input
                required
                type="file"
                multiple
                className="hidden"
                ref={fileInputRef2}
                onChange={fileHandler2}
                onClick={(e) => (e.target.value = null)}
              />
              <div className="flex justify-evenly">

                <p >{file2 ? file2.name : ""}</p>
                <button style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  onClick={(event) => {
                    event.preventDefault();
                    fileInputRef2.current.click();
                  }}
                >
                  select file
                </button>
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                  disabled={disabled2}>
                  Submit
                </button>
                {uploadSuccessful2 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}
              </div>
            </div>
          </form>




          <hr className="mb-2" />
          
          <form onSubmit={handleSubmit(handleUpload3)}>
            <div className="flex justify-between mb-5">
              <p>Copy of letter mandating employees to file individual tax returns <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small></p>
              <input
                type="file"
                multiple
                className="hidden"
                ref={fileInputRef3}
                onChange={fileHandler3}
                onClick={(e) => (e.target.value = null)}
              />
              <div className="flex justify-evenly">
                <p >{file3 ? file3.name : ""}</p>
                <button style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  onClick={(event) => {
                    event.preventDefault();
                    fileInputRef3.current.click();
                  }}
                >
                  select file
                </button>
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                  disabled={disabled3}>
                  Submit
                </button>
                {uploadSuccessful3 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}
              </div>
            </div>
          </form>


        </div>
      </Widget>

      <div className="mt-12">
        <h6 className="p-2 font-bold">Employee Schedule</h6>
      </div>

      <Widget>
        <div>
          {/* <form>
            <div className="flex justify-between mb-5">
              <p>Monthly payroll schedule <span className="font-bold" style={{ color: "red" }}> * </span><small>(excel)</small> </p>
              <input
                required
                type="file"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mr-4"
                  onClick={(event) => {
                    event.preventDefault();
                    fileInputRef.current.click();
                  }}
                >
                  select file
                </button>
                <p>{file ? file.name : "no file chosen yet"}</p>
              </div>
            </div>
          </form> */}

          <hr className="mb-2" />

          {/* <form>
            <div className="flex justify-between mb-5">
              <p>Evidence of PAYE remittance <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small></p>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                  onClick={(event) => {
                    event.preventDefault();
                    fileInputRef.current.click();
                  }}
                >
                  select file
                </button>
                <p>{file ? file.name : "no file chosen yet"}</p>
              </div>
            </div>
          </form> */}

          <hr className="mb-2" />

          {/* <form>
            <div className="flex justify-between mb-5">
              <p>List of exit staff  <small>(pdf, word, excel)</small> </p>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                  onClick={(event) => {
                    event.preventDefault();
                    fileInputRef.current.click();
                  }}
                >
                  select file
                </button>
                <p>{file ? file.name : "no file chosen yet"}</p>
              </div>
            </div>
          </form> */}

          <hr className="mb-2" />

          {/* <form>
            <div className="flex justify-between mb-5">
              <p>Trial balance for the year ended 31st Dec. 2021 </p>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                  onClick={(event) => {
                    event.preventDefault();
                    fileInputRef.current.click();
                  }}
                >
                  select file
                </button>
                <p>{file ? file.name : "no file chosen yet"}</p>
              </div>
            </div>
          </form> */}
        </div>
      </Widget>

      <div className="mt-12">
        <h6 className="p-2 font-bold">Remittance</h6>
      </div>

      {/* <Widget>
        <form>
          <div className="flex justify-between mb-5">
            <p>Schedule of withholding tax deductions <span className="font-bold" style={{ color: "red" }}> * </span> <small> (excel, pdf)</small><br /><span className="flex justify-end" style={{ color: "blue" }}><Link href="/csv/wht.csv"> download </Link></span></p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>


        <hr className="mb-2" />

        <form>
          <div className="flex justify-between mb-5">
            <p>Withholding tax receipts (corporate & Individual) <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small></p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>

        <hr className="mb-2" />

        <form>
          <div className="flex justify-between mb-5">
            <p>Monthly Immigration returns [where applicable] <small>(pdf, jpg, png)</small></p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>
      </Widget> */}

      <div className="mt-12"><h6 className="p-2 font-bold">Contributions and levies</h6></div>

      {/* <Widget>
        <form>
          <div className="flex justify-between mb-5">
            <p>Development levy receipts (corporate & Individual) <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small>  </p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>

        <hr className="mb-2" />

        <form>
          <div className="flex justify-between mb-5">
            <p>Business premises receipts (corporate & Individual) <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png</small> ) </p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>

        <hr className="mb-2" />

        <form>
          <div className="flex justify-between mb-5">
            <p>Ground rent receipts (corporate & Individual) <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small> </p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>

        <hr className="mb-2" />
        <form>
          <div className="flex justify-between mb-5">
            <p>Social service contributions levy (SSCL) (corporate & Individual) <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png</small> ) </p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>
      </Widget> */}

      <div className="mt-12"><h6 className="p-2 font-bold">Deductions</h6></div>

      {/* <Widget>
        <div className="flex justify-between mb-5">
          <p>Evidence of remittance of pension <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small>  </p>
          <input
            required
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={fileHandler}
          />
          <div className="flex items-center">
            <button
              style={{ backgroundColor: "#84abeb" }}
              className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
            >
              select file
            </button>
            <p>{file ? file.name : "no file chosen yet"}</p>
          </div>
        </div>

        <hr className="mb-2" />

        <form>
          <div className="flex justify-between mb-5">
            <p>Evidence of remittance of NHF <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small>  </p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>

        <hr className="mb-2" />

        <form>
          <div className="flex justify-between mb-5">
            <p>Evidence of remittance of NHIS <span className="font-bold" style={{ color: "red" }}> * </span></p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>

        <hr className="mb-2" />

        <form>
          <div className="flex justify-between mb-5">
            <p>Evidence of remittance of LAP <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small> </p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>
      </Widget> */}

      {open && (
        <>
          <div className="modal-backdrop fade-in"></div>
          <div
            className={`modal show ${background === 'dark' ? 'dark' : ''}`}
            data-background={background}
          >
            <div
              className="relative w-auto lg:my-4 mx-auto lg:max-w-lg max-w-sm"
              ref={modalRef}
            >
              <div className="bg-white  text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
                <div className="relative p-4 flex-auto">
                  <div className="flex items-start justify-start p-2 space-x-4">
                    <div className="flex-shrink-0 w-12">
                      {uploadErrors.length > 0 ? (
                        <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                          <FiX
                            size={18}
                            className="stroke-current text-red-500"
                          />
                        </span>
                      ) : uploadSuccessful ? (
                        <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                          <FiCheck
                            size={18}
                            className="stroke-current text-green-500"
                          />
                        </span>
                      ) : null}
                    </div>
                    <div className="w-full">
                      <div className="text-lg mb-2 font-bold">
                        {uploadErrors.length > 0 ? (
                          <span>Failed to Upload</span>
                        ) : uploadSuccessful ? (
                          <span>Upload Successful</span>
                        ) : null}
                      </div>
                      <div className="overflow-auto max-h-64">
                        {uploadErrors.length > 0 &&
                          uploadErrors.map((err, i) => (
                            <li className="text-red-500" key={i}>
                              {err}
                            </li>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700 border-solid rounded-b space-x-2">
                  <button
                    className="btn btn-default btn-rounded bg-white hover:bg-gray-100 text-gray-900"
                    type="button"
                    onClick={hide}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {open && (
        <>
          <div className="modal-backdrop fade-in"></div>
          <div
            className={`modal show ${background === 'dark' ? 'dark' : ''}`}
            data-background={background}
          >
            <div
              className="relative w-auto lg:my-4 mx-auto lg:max-w-lg max-w-sm"
              ref={modalRef}
            >
              <div className="bg-white  text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
                <div className="relative p-4 flex-auto">
                  <div className="flex items-start justify-start p-2 space-x-4">
                    <div className="flex-shrink-0 w-12">
                      {uploadErrors.length > 0 ? (
                        <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                          <FiX
                            size={18}
                            className="stroke-current text-red-500"
                          />
                        </span>
                      ) : uploadSuccessful2 ? (
                        <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                          <FiCheck
                            size={18}
                            className="stroke-current text-green-500"
                          />
                        </span>
                      ) : null}
                    </div>
                    <div className="w-full">
                      <div className="text-lg mb-2 font-bold">
                        {uploadErrors.length > 0 ? (
                          <span>Failed to Upload</span>
                        ) : uploadSuccessful2 ? (
                          <span>Upload Successful</span>
                        ) : null}
                      </div>
                      <div className="overflow-auto max-h-64">
                        {uploadErrors.length > 0 &&
                          uploadErrors.map((err, i) => (
                            <li className="text-red-500" key={i}>
                              {err}
                            </li>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700 border-solid rounded-b space-x-2">
                  <button
                    className="btn btn-default btn-rounded bg-white hover:bg-gray-100 text-gray-900"
                    type="button"
                    onClick={hide2}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}


      {open && (
        <>
          <div className="modal-backdrop fade-in"></div>
          <div
            className={`modal show ${background === 'dark' ? 'dark' : ''}`}
            data-background={background}
          >
            <div
              className="relative w-auto lg:my-4 mx-auto lg:max-w-lg max-w-sm"
              ref={modalRef}
            >
              <div className="bg-white  text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
                <div className="relative p-4 flex-auto">
                  <div className="flex items-start justify-start p-2 space-x-4">
                    <div className="flex-shrink-0 w-12">
                      {uploadErrors.length > 0 ? (
                        <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                          <FiX
                            size={18}
                            className="stroke-current text-red-500"
                          />
                        </span>
                      ) : uploadSuccessful3 ? (
                        <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                          <FiCheck
                            size={18}
                            className="stroke-current text-green-500"
                          />
                        </span>
                      ) : null}
                    </div>
                    <div className="w-full">
                      <div className="text-lg mb-2 font-bold">
                        {uploadErrors.length > 0 ? (
                          <span>Failed to Upload</span>
                        ) : uploadSuccessful3 ? (
                          <span>Upload Successful</span>
                        ) : null}
                      </div>
                      <div className="overflow-auto max-h-64">
                        {uploadErrors.length > 0 &&
                          uploadErrors.map((err, i) => (
                            <li className="text-red-500" key={i}>
                              {err}
                            </li>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700 border-solid rounded-b space-x-2">
                  <button
                    className="btn btn-default btn-rounded bg-white hover:bg-gray-100 text-gray-900"
                    type="button"
                    onClick={hide3}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AnnualCSVUploadForm;
