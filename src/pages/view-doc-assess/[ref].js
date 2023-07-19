import url from '../../config/url';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
import Loader from 'react-loader-spinner';

const ViewDoc = () => {
    const router = useRouter();
    const [payerprop, setpayerprop] = useState({});
    const [isFetching, setIsFetching] = useState(() => true);
    const [globalAssId, setGlobalAssId] = useState("")
    const [employed, setEmployed] = useState([])

    useEffect(() => {
        if (router && router.query) {
            let routerData = String(router.query.ref);
            let kgtin = routerData.split(',').pop()
            let assessmentId = routerData.split(',').shift()
            let sendData = {
                KGTIN: `${kgtin}`,
                assessment_id: `${assessmentId}`
            }
            setGlobalAssId(assessmentId)
            setAuthToken()
            const fetchPost = async () => {
                try {
                    let res = await axios.post(`${url.BASE_URL}forma/view-assessment`, sendData);
                    let IndData = res.data.body
                    let employedat = IndData.employed
                    setEmployed(employedat)
                    setIsFetching(false)
                } catch (err) {
                    setIsFetching(false)
                    console.log(err);
                }
            };
            fetchPost();
        }
    }, [router]);
    return (

        <>
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
                    <p>Fetching data...</p>
                </div>
            ) : <div>
                <p>Payslip</p>
                {employed != null || employed != ""
                    ? employed.map((el, i) =>
                    <div>
                        <button key={i}
                            className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                        >
                            <a href={`https://annualuploads.bespoque.dev/rhm-live/uploads/da/forma/${el.pay_slip}`} target="_blank"> View Document</a>
                            
                        </button>
                    </div>

                    )
                    :  <p className="font-bold">No Document</p>
                }
            </div>}

        </>

    )
};

export default ViewDoc;
