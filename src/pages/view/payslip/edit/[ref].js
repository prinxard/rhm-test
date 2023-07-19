import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import setAuthToken from '../../../../functions/setAuthToken';
import url from "../../../../config/url"
import axios from "axios";
import { formatNumber } from 'accounting';
import SectionTitle from '../../../../components/section-title';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import { FormatMoneyComponentReport } from '../../../../components/FormInput/formInputs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Widget from '../../../../components/widget';

function UpdatePayslip() {
    const [id, setId] = useState("")
    const [payslipData, setPayslipData] = useState([])
    const [isFetching, setIsFetching] = useState(() => true);
    const [createError, setCreateError] = useState("");
    const [numberVal, setNumberVal] = useState({ amount: "" });
    const [station, setTaxStation] = useState([])
    const router = useRouter()
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors }
    } = useForm(
        { mode: "onBlur", }
    )

    let otherReliefWatch = watch("other_relief", "0").replace(/,/g, '')
    let watch_relief_notes = watch("other_relief_notes", "").replace(/,/g, '')

    useEffect(() => {
        const fetchPost = async () => {
            try {
                let res = await axios.get(`${url.BASE_URL}user/items`);
                let office = res.data.body.taxOffice
                setTaxStation(office)

            } catch (e) {
                // setIsFetching(false);
            }
        };
        fetchPost();
    }, [])

    const updatePayslip = (data) => {
        if (otherReliefWatch > 0 && watch_relief_notes === "") {
            alert("Please fill out the reason for other Deduction")
        } else {
            setIsFetching(true)
            data.id = id
            data.consolidated_relief = consolidatedRelief
            data.basic = (data.basic).replace(/,/g, '')
            data.other_allw = (data.other_allw).replace(/,/g, '')
            data.pension = (data.pension).replace(/,/g, '')
            data.nhf = (data.nhf).replace(/,/g, '')
            data.benefits = (data.benefits).replace(/,/g, '')
            data.lap = (data.lap).replace(/,/g, '')
            data.housing = (data.housing).replace(/,/g, '')
            data.other_relief = (data.other_relief).replace(/,/g, '')
            data.trans_allw = (data.trans_allw).replace(/,/g, '')
            data.leave_allw = (data.leave_allw).replace(/,/g, '')
            data.utilities = (data.utilities).replace(/,/g, '')
            data.upfront = (data.upfront).replace(/,/g, '')
            data.month_13 = (data.month_13).replace(/,/g, '')
            data.housing = (data.housing).replace(/,/g, '')
            data.payroll_year = payroll_year
            data.tax = tax

            axios.put(`${url.BASE_URL}paye/payslip`, data)
                .then(function (response) {
                    setIsFetching(false)
                    toast.success("updated Successfully!");
                })
                .catch(function (error) {
                    setIsFetching(false)
                    if (error.response) {
                        setCreateError(() => error.response.data.message);
                    } else {
                        toast.error("Failed to update!");
                    }
                })
        }
    }

    setAuthToken();
    useEffect(() => {
        if (router && router.query) {
            let payslipId = router.query.ref;
            setId(payslipId)
            const fetchPost = async () => {
                try {
                    setIsFetching(false);
                    let res = await axios.get(`${url.BASE_URL}paye/payslip?id=${payslipId}`);
                    let fetchPayslip = res.data.body.payroll;
                    setPayslipData(fetchPayslip)
                    console.log(fetchPayslip);
                } catch (e) {
                    setIsFetching(false);
                    console.log(e);
                }
            };
            fetchPost();
        }
    }, [router]);

    let housing = watch("housing", "0").replace(/,/g, '')
    let trans_allw = watch("trans_allw", "0").replace(/,/g, '')
    let leave_allw = watch("leave_allw", "0").replace(/,/g, '')
    let utilities = watch("utilities", "0").replace(/,/g, '')
    let other_allw = watch("other_allw", "0").replace(/,/g, '')
    let benefits = watch("benefits", "0").replace(/,/g, '')
    let pension = watch("pension", "0").replace(/,/g, '')
    let month_13 = watch("month_13", "0").replace(/,/g, '')
    let nhf = watch("nhf", "0").replace(/,/g, '')
    let lap = watch("lap", "0").replace(/,/g, '')
    let basic = watch("basic", "0").replace(/,/g, '')
    let no_months = watch("no_months", "0").replace(/,/g, '')
    let payroll_year = watch("payroll_year", new Date())
    payroll_year = payroll_year.getFullYear()
    let consolidatedRelief
    let tax

    let allowance = (Number(housing) + Number(trans_allw) + Number(month_13) + Number(leave_allw) + Number(utilities) + Number(other_allw) + Number(benefits));
    let totalRelief = (Number(pension) + Number(nhf) + Number(lap));

    let consolidatedIncome = (Number(basic) + Number(allowance));
    // console.log("Consl", consolidatedIncome);

    consolidatedIncome = consolidatedIncome / no_months * 12;
    totalRelief = totalRelief / no_months * 12;

    let gross_inc = Number(consolidatedIncome) - Number(totalRelief);
    // console.log(gross_inc, ' gross')


    if (consolidatedIncome < 300000.0) {
        consolidatedRelief = 0;
        //console.log(gross_inc);
    } else {
        consolidatedRelief = 200000 + 0.2 * gross_inc;
        // console.log("Gross INC", gross_inc);
    }

    let totalDeduction = consolidatedRelief + totalRelief;
    let chargeableIncome = consolidatedIncome - totalDeduction;

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
    tax = tax / 12 * no_months;

    return (
        <>
            <ToastContainer />
            <SectionTitle title="Update Income details" />
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
                    <p className="font-bold">Please wait...</p>
                </div>
            )}
            {payslipData.map((data) => (


                <form onSubmit={handleSubmit(updatePayslip)} className="border mb-3 block p-6 rounded-lg w-full">
                    <p className="text-red-600 mb-3">{createError}</p>
                    <Widget>
                        <div className="flex gap-2 justify-center ">
                            {/* <div className="grid grid-cols-2 gap-4 w-1/2 border-r"> */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="form-group ">
                                    <p>Organization/Employer <small className="font-bold text-red-600">*</small></p>
                                    <input name="org_id" ref={register()} value={data.org_id} required readOnly type="text" className="form-control  w-full rounded font-light text-gray-500"
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>Taxpayer/Employee <small className="font-bold text-red-600">*</small></p>
                                    <input name="paye_tp" ref={register()} value={data.paye_tp} required readOnly type="text" className="form-control  w-full rounded font-light text-gray-500"
                                    />
                                </div>
                                <div className="form-group ">
                                    <p className="block">Year <small className="font-bold text-red-600">*</small></p>
                                    <Controller
                                        name="payroll_year"
                                        ref={register()}
                                        control={control}
                                        defaultValue={new Date(`${data.payroll_year}`)}
                                        render={({ onChange, value }) => {
                                            return (
                                                <DatePicker
                                                    className="form-control w-full rounded"
                                                    onChange={onChange}
                                                    selected={value}
                                                    showYearPicker
                                                    dateFormat="yyyy"
                                                    yearItemNumber={8}
                                                    placeholderText="Select Year"
                                                    required={true}
                                                />
                                            );
                                        }}
                                    />

                                </div>


                                <div className="form-group ">
                                    <p>Number of months <small className="font-bold text-red-600">*</small></p>
                                    <input name="no_months" defaultValue={data.no_months} ref={register()} type="number" className="form-control  w-full rounded font-light text-gray-500"
                                    />
                                </div>


                                <div className="form-group ">
                                    <p>Tax Office <small className="font-bold text-red-600">*</small></p>
                                    <select required ref={register()} name="tax_office" className="form-control  SlectBox w-full rounded font-light text-gray-500">
                                        <option defaultValue={data.tax_office}>{data.tax_office}</option>
                                        {station.map((office) => <option key={office.idstation} value={office.station_code}>{office.name}</option>)}
                                    </select>
                                </div>


                                <div className="form-group ">
                                    <p>Rank/G-Level</p>
                                    <input name="rank" defaultValue={data.rank} ref={register()} type="text" className="form-control  w-full rounded font-light text-gray-500"
                                    />
                                </div>

                            </div>
                        </div>
                    </Widget>

                    <Widget>
                        <div className="flex gap-2 justify-center">
                            <div className="grid grid-cols-2 gap-4 w-1/2 border-r pr-3">
                                <p className="font-bold">INCOME </p>
                                <p></p>
                                <div className="form-group ">
                                    <p>Annual Salary <small className="font-bold text-red-600">*</small></p>
                                    <FormatMoneyComponentReport
                                        ref={register()}
                                        name="basic"
                                        control={control}
                                        defaultValue={data.basic}
                                        onValueChange={(v) => setNumberVal({ amount: v })}
                                        required={true}
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>Housing Allowance</p>
                                    <FormatMoneyComponentReport
                                        name="housing"
                                        control={control}
                                        defaultValue={data.housing}
                                        onValueChange={(v) => setNumberVal({ amount: v })}
                                        ref={register()}
                                        required={true}
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>Transport Allowance</p>
                                    <FormatMoneyComponentReport
                                        name="trans_allw"
                                        control={control}
                                        defaultValue={data.trans_allw}
                                        onValueChange={(v) => setNumberVal({ amount: v })}
                                        ref={register()}
                                        required={true}
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>Leave Allowance</p>
                                    <FormatMoneyComponentReport
                                        name="leave_allw"
                                        control={control}
                                        defaultValue={data.leave_allw}
                                        onValueChange={(v) => setNumberVal({ amount: v })}
                                        ref={register()}
                                        required={true}
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>Utilities</p>
                                    <FormatMoneyComponentReport
                                        name="utilities"
                                        control={control}
                                        defaultValue={data.utilities}
                                        onValueChange={(v) => setNumberVal({ amount: v })}
                                        ref={register()}
                                        required={true}
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>Other Allowance</p>
                                    <FormatMoneyComponentReport
                                        name="other_allw"
                                        control={control}
                                        defaultValue={data.other_allw}
                                        onValueChange={(v) => setNumberVal({ amount: v })}
                                        ref={register()}
                                        required={true}
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>Upfront</p>
                                    <FormatMoneyComponentReport
                                        name="upfront"
                                        control={control}
                                        defaultValue={data.upfront}
                                        onValueChange={(v) => setNumberVal({ amount: v })}
                                        ref={register()}
                                        required={true}
                                    />
                                </div>

                                <div className="form-group">
                                    <p>Benefits</p>
                                    <FormatMoneyComponentReport
                                        name="benefits"
                                        control={control}
                                        defaultValue={data.benefits}
                                        onValueChange={(v) => setNumberVal({ amount: v })}
                                        ref={register()}
                                        required={true}
                                    />
                                </div>

                                <div className="form-group">
                                    <p>Thirteenth Month</p>
                                    <FormatMoneyComponentReport
                                        name="month_13"
                                        control={control}
                                        defaultValue={data.month_13}
                                        onValueChange={(v) => setNumberVal({ amount: v })}
                                        ref={register()}
                                        required={true}
                                    />
                                </div>
                            </div>


                            <div className="grid grid-cols-2 gap-4 w-1/2 content-start">
                                <p className="font-bold">DEDUCTONS</p>
                                <p></p>
                                <div className="form-group ">
                                    <p>Pension</p>
                                    <FormatMoneyComponentReport
                                        name="pension"
                                        control={control}
                                        defaultValue={data.pension}
                                        onValueChange={(v) => setNumberVal({ amount: v })}
                                        ref={register()}
                                        required={true}
                                    />
                                </div>

                                <div className="form-group ">
                                    <p>National Housing Fund (NHF)</p>
                                    <FormatMoneyComponentReport
                                        name="nhf"
                                        control={control}
                                        defaultValue={data.nhf}
                                        onValueChange={(v) => setNumberVal({ amount: v })}
                                        ref={register()}
                                        required={true}
                                    />
                                </div>
                                <div className="form-group ">
                                    <p>Life Assurance (LAP)</p>
                                    <FormatMoneyComponentReport
                                        name="lap"
                                        control={control}
                                        defaultValue={data.lap}
                                        onValueChange={(v) => setNumberVal({ amount: v })}
                                        ref={register()}
                                        required={true}
                                    />
                                </div>
                                <div className="form-group ">
                                    <p>Other Deduction</p>
                                    <FormatMoneyComponentReport
                                        name="other_relief"
                                        control={control}
                                        defaultValue={data.other_relief}
                                        onValueChange={(v) => setNumberVal({ amount: v })}
                                        ref={register()}
                                        required={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <p>Reason for Other Deduction</p>
                                    <textarea defaultValue={data.other_relief_notes} ref={register()} name="other_relief_notes" id="" cols="30" rows="2"></textarea>
                                </div>
                                <p className="form-group"></p>

                                <p className="font-bold">TAX CALCULATION</p>
                                <p></p>

                                <div className="form-group">
                                    <p className="font-bold">Gross Income</p>
                                    <p className="font-bold">{formatNumber(gross_inc)}</p>
                                </div>
                                <div className="form-group">
                                    <p className="font-bold">Consolidated Relief</p>
                                    <p className="font-bold">{formatNumber(consolidatedRelief)}</p>
                                </div>
                                <div className="form-group">
                                    <p className="font-bold">Taxable Income</p>
                                    <p className="font-bold">{formatNumber(gross_inc - ((consolidatedRelief + totalRelief)))}</p>
                                </div>
                                <div className="form-group">
                                    <p className="font-bold">Tax Payable</p>
                                    <p className="font-bold">{formatNumber(tax)}</p>
                                </div>
                            </div>
                        </div>
                    </Widget>

                    <div className="flex justify-center">
                        <button

                            style={{ backgroundColor: "#84abeb" }}
                            className="btn btn-default text-white my-4 btn-outlined bg-transparent rounded-md"
                        >
                            Submit
                        </button>

                    </div>
                </form>
            ))}
        </>
    )
}

export default UpdatePayslip