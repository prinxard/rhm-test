import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import CustomButton from "../CustomButton/CustomButton";
import MaterialTable, { MTableToolbar } from "material-table";
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Add from '@material-ui/icons/Add'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import setAuthToken from "../../functions/setAuthToken";
import { useState } from "react";
import url from '../../config/url';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Delete, Edit, MoreHoriz, WarningRounded } from "@material-ui/icons";
import Loader from "react-loader-spinner";

const fields = [
  {
    title: "SN",
    field: "serialNo",
    filtering: false,
    width: "10%"
  },
  {
    title: "Organization",
    field: "orgName",
  },
  {
    title: "Employee",
    field: "tpName",
  },
  {
    title: "Employee TIN",
    field: "paye_tp",
  },
  {
    title: "Gross Salary",
    field: "basic",
    render: (basic) => formatNumber(basic.basic)
  },
  {
    title: "Tax",
    field: "tax",
    render: (tax) => formatNumber(tax.tax)
  },
  {
    title: "Consolidated Relief",
    field: "consolidated_relief",
    render: (rel) => formatNumber(rel.consolidated_relief)
  },
  {
    title: "Year",
    field: "payroll_year",
  },
  {
    title: "Tax Office",
    field: "tax_office",
  },

  {
    title: "Create Time",
    field: "insert_time",
  }
];



export const ViewPayslipTable = ({ tccdata }) => {
  let items = tccdata;
  const [modal, setModal] = useState(false);
  const [payslipId, setPayslipId] = useState("");
  const [isFetching, setIsFetching] = useState(() => false);

  const router = useRouter()
  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  const toggleModal = () => {
    setModal(!modal);
  };

  const DeleteAssessment = async (data) => {
    data.preventDefault()
    setIsFetching(true)
    try {
      await axios.delete(`${url.BASE_URL}paye/payslip?id=${payslipId}`)
      setIsFetching(false)
      toast.success("Deleted Successfully!");
      window.location.reload()
    } catch (error) {
      setIsFetching(false)
      if (error) {
        toast.error(error.response.data.message)
      } else {

      }
    }
  };

  return (
    <>
      <ToastContainer />
      {modal && (
        <div className="modal">
          <div className="modal-content" width="300">
            <form onSubmit={DeleteAssessment}>
              <div className="flex justify-center">
                <WarningRounded
                  size={15}
                  className="text-yellow-400"
                />
              </div>
              <p>Are you sure you want to delete?</p>
              <div className="mt-2 flex justify-between">
                <button onClick={toggleModal}
                  className="btn w-32 bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                >
                  Cancel
                </button>
                <div>

                </div>
                <button
                  className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Continue
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

      {isFetching && (
        <div className="flex justify-start item mb-2">
          <Loader
            visible={isFetching}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p className="font-bold">Processing...</p>
        </div>
      )}
      <MaterialTable title="Income List"
        data={items}
        columns={fields}

        actions={
          [

            {
              icon: MoreHoriz,
              tooltip: 'View',
              onClick: (event, rowData) => router.push(`/view/payslip/${rowData.id}`),

            },
            // {
            //   icon: Edit,
            //   tooltip: 'Edit',
            //   onClick: (event, rowData) => router.push(`/view/payslip/edit/${rowData.id}`),

            // },
            {
              icon: Delete,
              tooltip: 'Delete',
              onClick: (event, rowData) => {
                event.preventDefault()
                setPayslipId(rowData.id)
                setModal(true)
              },

            }
          ]}

        options={{
          search: true,
          paging: true,
          filtering: true,
          actionsColumnIndex: -1,
          exportButton: {
            csv: true,
            pdf: false
          },
          exportAllData: true,

        }}
        icons={{
          Check: Check,
          DetailPanel: ChevronRight,
          Export: SaveAlt,
          Filter: () => <Icons.Filter />,
          FirstPage: FirstPage,
          LastPage: LastPage,
          NextPage: ChevronRight,
          PreviousPage: ChevronLeft,
          Search: Search,
          ThirdStateCheck: Remove,
          Clear: Clear,
          SortArrow: ArrowDownward
        }}

      // onRowClick={(event, rowData) => {

      //   window.open(`/view/payslip/${rowData.id}`, "_self")
      //   event.stopPropagation();
      //   // if (userGroup.some(r => reportRange.includes(r))) {
      //   //   ''

      //   // } else {

      //   //   window.open(`/view/listtcc/${rowData.id}`, "_self")
      //   //   event.stopPropagation();
      //   // }
      // }}
      />

      <style
        jsx>{
          `
        body.active-modal {
          overflow-y: hidden;
      }
      
      // .btn-modal {
      //     padding: 10px 20px;
      //     display: block;
      //     margin: 100px auto 0;
      //     font-size: 18px;
      // }
      
      .modal, .overlay {
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          position: fixed;
      }
      
      .overlay {
          background: rgba(49,49,49,0.8);
      }
      .modal-content {
          position: absolute;
          top: 20%;
          left: 60%;
          transform: translate(-50%, -50%);
          line-height: 1.4;
          background: #f1f1f1;
          padding: 14px 28px;
          border-radius: 3px;
          max-width: 400px;
          min-width: 300px;
      }
      
      .close-modal {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px 7px;
      }
        `
        }
      </style>
    </>
  );
};

export const ViewSinglePayslip = ({ paySlipData }) => {
  return (
    <>
      <Widget>
        <div className="py-10 w-full">
          {paySlipData.map((data) => (
            <div className="lg:flex justify-between w-full">
              <div className="w-full">
                <div className="uppercase lg:w-4/5 w-full px-2">
                  <h6 className="font-bold mb-2 text-base text-gray-500">
                    Employee details
                  </h6>
                  <div className="shadow-lg w-full">
                    <div className="  w-full p-2">
                      <h1 className="text-sm">Organization Name</h1>
                      <span className="text-black font-semibold">
                        {data.orgName}
                      </span>
                    </div>
                    <div className="  w-full p-2">
                      <h1 className="text-sm">Organization KGTIN</h1>
                      <span className="text-black font-semibold">
                        {data.org_id}
                      </span>
                    </div>
                    <div className="  w-full p-2">
                      <h1 className="text-sm">Taxpayer Name</h1>
                      <span className="text-black font-semibold">
                        {data.tpName}
                      </span>
                    </div>
                    <div className="  w-full p-2">
                      <h1 className="text-sm">Taxpayer KGTIN</h1>
                      <span className="text-black font-semibold">
                        {data.paye_tp}
                      </span>
                    </div>
                    <div className="  w-full p-2">
                      <h1 className="text-sm">Year</h1>
                      <span className="text-black font-semibold">
                        {data.payroll_year}
                      </span>
                    </div>
                    <div className="  w-full p-2">
                      <h1 className="text-sm">Number of Months</h1>
                      <span className="text-black font-semibold">
                        {data.no_months}
                      </span>
                    </div>
                    <div className="  w-full p-2">
                      <h1 className="text-sm">rank</h1>
                      <span className="text-black font-semibold">
                        {data.rank}
                      </span>
                    </div>
                    <div className="  w-full p-2">
                      <h1 className="text-sm">Tax Office</h1>
                      <span className="text-black font-semibold">
                        {data.tax_office}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="uppercase lg:w-4/5 w-full px-2">
                  <h6 className="font-bold mb-2 text-base text-gray-500">
                    Income details
                  </h6>
                  <div className="shadow-lg w-full">
                    <div className="w-full p-2">
                      <h1 className="text-sm">Basic Annual Salary</h1>
                      <span className="text-black font-semibold">
                        {formatNumber(data.basic)}
                      </span>
                    </div>
                    <div className="w-full p-2">
                      <h1 className="text-sm">Pension</h1>
                      <span className="text-black font-semibold">
                        {formatNumber(data.pension)}
                      </span>
                    </div>
                    <div className="w-full p-2">
                      <h1 className="text-sm">National Housing Fund (NHF)</h1>
                      <span className="text-black font-semibold">
                        {formatNumber(data.nhf)}
                      </span>
                    </div>
                    <div className="w-full p-2">
                      <h1 className="text-sm">Life Assurance</h1>
                      <span className="text-black font-semibold">
                        {formatNumber(data.lap)}
                      </span>
                    </div>
                    <div className="w-full p-2">
                      <h1 className="text-sm">Leave Allowance</h1>
                      <span className="text-black font-semibold">
                        {formatNumber(data.leave_allw)}
                      </span>
                    </div>
                    <div className="w-full p-2">
                      <h1 className="text-sm">Transport Allowance</h1>
                      <span className="text-black font-semibold">
                        {formatNumber(data.trans_allw)}
                      </span>
                    </div>
                    <div className="w-full p-2">
                      <h1 className="text-sm">Other Allowance</h1>
                      <span className="text-black font-semibold">
                        {formatNumber(data.other_allw)}
                      </span>
                    </div>
                    <div className="w-full p-2">
                      <h1 className="text-sm">Housing Allowance</h1>
                      <span className="text-black font-semibold">
                        {formatNumber(data.housing)}
                      </span>
                    </div>
                    <div className="w-full p-2">
                      <h1 className="text-sm">Thirteenth Month</h1>
                      <span className="text-black font-semibold">
                        {formatNumber(data.month_13)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="uppercase lg:w-4/5 w-full px-2">
                  <h6 className="font-bold mb-2 text-base text-gray-500">
                    Tax Coputation
                  </h6>
                  <div className="shadow-lg w-full">
                    <div className="w-full p-2">
                      <h1 className="text-sm ">Gross Income </h1>
                      <span className="text-black font-semibold">
                        {formatNumber(Number(data.basic) + Number(data.housing) + Number(data.other_allw) + Number(data.trans_allw) + Number(data.leave_allw))}
                      </span>
                    </div>
                    <div className="w-full p-2">
                      <h1 className="text-sm ">Consolidated Relief</h1>
                      <span className="text-black font-semibold">
                        {formatNumber(data.consolidated_relief)}
                      </span>
                    </div>
                    <div className="w-full p-2">
                      <h1 className="text-sm ">Taxable Income</h1>
                      <span className="text-black font-semibold">
                        {formatNumber((Number(data.basic) + Number(data.housing) + Number(data.other_allw) + Number(data.trans_allw) + Number(data.leave_allw)) - data.consolidated_relief)}
                      </span>
                    </div>
                    <div className="w-full p-2">
                      <h1 className="text-sm ">Tax Payable</h1>
                      <span className="text-black font-semibold">
                        {formatNumber(data.tax)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </Widget>
    </>
  )
};