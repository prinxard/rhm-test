import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import axios from "axios";
import { useState } from 'react';
import url from "../../../../config/url";
import { useForm } from 'react-hook-form';
import setAuthToken from '../../../../functions/setAuthToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import { FormatMoneyComponentReport } from '../../../../components/FormInput/formInputs';

const FundAgentWallet = () => {
    const [createError, setError] = useState("")
    const [isFetching, setIsFetching] = useState(() => false);
    const [userdetails, setUserDetails] = useState([]);
    const [emailurl, setEmailUrl] = useState([]);
    const [fixedValues, fixValues] = useState({ amount: "" });
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    setAuthToken();
    useEffect(() => {
        setIsFetching(true);
        if (router && router.query) {
            const agentEmail = router.query.ref;
            setEmailUrl(agentEmail)
            const fetchPost = () => {
                axios.get(`${url.BASE_URL}market/admin/agent/profile?id=${agentEmail}`)
                    .then(function (response) {
                        setIsFetching(false);
                        const detailsUser = response.data.body.userDetails
                        setUserDetails(detailsUser)
                    })
                    .catch(function (error) {
                        setIsFetching(false);
                    })
            };
            fetchPost();
        }
    }, [router]);

    const onSubmit = (data) => {
        data.amount = (data.amount).replace(/,/g, '')
        setIsFetching(true)

        axios.post(`${url.BASE_URL}market/admin/agent/account`, data)
            .then(function (response) {
                setIsFetching(false)
                toast.success("Funded Successfully!");
                router.push("/dashboard")
            })
            .catch(function (error) {
                setIsFetching(false)
                if (error.response) {
                    setError(() => error.response.data.message);
                } else {
                    toast.error("Failed to create user!");
                }
            })
    };

    return (
        <>
            <ToastContainer />
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
                    <p className="font-bold">Processing...</p>
                </div>
            )}
            <div className="flex border mb-3 block p-3 justify-center rounded-lg bg-white w-full">
                <section>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h4 htmlFor="" className="mb-3">Fund Wallet</h4>
                        <small className="flex text-red-600">{createError}</small>
                        <input type="text" ref={register()} name="user" className="hidden" value={emailurl} />
                        <FormatMoneyComponentReport
                            ref={register()}
                            name="amount"
                            control={control}
                            defaultValue={""}
                            onValueChange={(v) => fixValues({ amount: v })}
                            placeholder="₦ Enter Amount"
                            required={true}
                        />
                        <button
                            style={{ backgroundColor: "#84abeb" }}
                            className="btn btn-default mt-3 text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                        >
                            Fund
                        </button>
                    </form>
                </section>

            </div>
        </>
    )
}

export default FundAgentWallet