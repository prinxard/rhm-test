import dateformat from "dateformat";
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
import url from '../../config/url';
import axios from "axios";
import { addDays, subDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useRouter } from "next/router";
import Reportstable from "../../pages/reports/reportstable";
import IndividualReportstable from "../../pages/reports-individual/individualreportstable";
import { useForm } from "react-hook-form";

export const StartIndividualReportView = () => {
  const [fixedValues, SetFixValuesStart] = useState({ amount: 0 });
  const [fixedValuesend, SetFixValuesEnd] = useState({ amount: 0 });
  const [revenueItem, setRevenueItem] = useState([]);
  const [station, setStation] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tableState, setTableState] = useState("hidden");


  const router = useRouter();

  const [state, setState] = useState([
    {
      startDate: null,
      // endDate: null,
      endDate: new Date(""),
      key: 'selection'
    }
  ]);

  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );


  const reportRange = [39]
  const decoded = jwt.decode(auth);
  const userGroup = decoded.groups

  let startDate
  let endDate

  if (state[0].startDate === null) {

    startDate = ""

  } else {
    startDate = dateformat(state[0].startDate, "yyyy-mm-dd")
  }

  // * using == to compare endDate value
  if (state[0].endDate === null || state[0].endDate === "" || state[0].endDate === undefined || state[0].endDate == "Invalid Date") {

    endDate = ""

  } else {
    endDate = dateformat(state[0].endDate, "yyyy-mm-dd")
  }

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()



  useEffect(() => {

    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}user/items`);
        let itemsBody = res.data.body
        let office = itemsBody.taxOffice
        setStation(office)

      } catch (e) {
        // setIsFetching(false);
        console.log(e);
      }
    };
    fetchPost();

  }, []);


  const AdvancedSearch = (data) => {
    setIsFetching(true)
    data.createdStart = startDate
    data.createdEnd = endDate
    data.platform = ""

    let num = 1
    let records = [];
    axios.post(`${url.BASE_URL}taxpayer/list-individual`, data)
      .then(function (response) {
        let search = response.data.body;
        for (let i = 0; i < search.length; i++) {
          let rec = search[i];
          rec.serialNo = num + i
          records.push(rec);
        }
        setFilteredData(records)
        setIsFetching(false)
        setTableState('')
        console.log("records", records);
      })
      .catch(function (error) {
        setTableState('')
        setIsFetching(false)

      })
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(AdvancedSearch)}>
          <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            <div className="w-full lg:w-1/3 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input type="text" placeholder="Taxpayer ID" ref={register()} name="kgtin" className="form-control w-full rounded font-light text-gray-500" />
                </div>

                <div>
                  <input type="text" ref={register()} placeholder="First Name" name="first_name" className="form-control w-full rounded font-light text-gray-500"
                  />
                </div>
                <div>
                  <select ref={register()} placeholder="Station" name="tax_office" className="form-control w-full rounded font-light text-gray-500">
                    <option value="">Station</option>
                    {station.map((office) => <option key={office.idstation} value={office.station_code}>{office.name}</option>)}
                  </select>
                </div>

                <div>
                  <input type="text" ref={register()} placeholder="Surname" name="surname" className="form-control w-full rounded font-light text-gray-500"
                  />
                </div>

                <div>
                  <input type="text" ref={register()} placeholder="Phone" name="phone" className="form-control w-full rounded font-light text-gray-500"
                  />
                </div>

              </div>

            </div>

            <div className="w-full lg:w-2/3">
              <div className="overflow-x-auto max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                <p className="font-bold text-center mb-5">Created Date Range (Start - End)</p>
                <DateRangePicker
                  onChange={item => setState([item.selection])}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={1}
                  ranges={state}
                  direction="horizontal"
                />

                <div className="flex justify my-4">
                  <div className="grid grid-cols-2 gap-4 justify-self-center">
                    <div className="form-group">
                      <button className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>


        </form>
      </div>

      {isFetching ? (
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
          <p className="font-bold">Processing...</p>
        </div>
      ) :
        <div className={`${tableState}`}>
          <IndividualReportstable FilteredData={FilteredData} />
        </div>
      }
    </>
  );
};