import React from 'react'
import { formatNumber } from "../../../functions/numbers"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import SectionTitle from '../../../components/section-title';
import Widget from '../../../components/widget';
import { NewFormInput } from '../../../components/FormInput/formInputs';
import AnnulCsv from '../../../components/tables/annualcsvtable';
import { CustomPagination } from "../../../components/pagination/customPagination"
import setAuthToken from "../../../functions/setAuthToken";
import url from '../../../config/url';
import axios from "axios";
import dateformat from "dateformat";

export default function Tablecsv() {
    const [post, setPost] = useState(() => []);
    const [total, setTotal] = useState(() => []);
    const [isFetching, setIsFetching] = useState(() => true);
    const [currentPage, setCurrentPage] = useState(() => 1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [query, setQuery] = useState(() => "");
    const [routerKgtin, setRouterKgtin] = useState(() => "");
    const [routerYear, setRouterYear] = useState(() => "");
    const [status, setStatus] = useState(() => "");
    const router = useRouter();

    useEffect(() => {
        if (router && router.query) {
            let routerData = String(router.query.ref);
            let kgtin_year = routerData.split("_");
            let kgtin = kgtin_year[0]
            let yearFormat = `${kgtin_year[1]}-01-01`
            setRouterKgtin(kgtin)
            setRouterYear(kgtin_year[1])
            setStatus(kgtin_year[2])
            let payload = {
                "employer_id": kgtin,
                "year": yearFormat
            }

            setAuthToken();
            const fetchPost = async () => {
                try {
                    let res = await axios.post(
                        `${url.BASE_URL}annual/view-annual`, payload);
                    res = res.data.body.annualYr
                    let sum = {};
                    let records = [];
                    let salarySum = [];
                    let reliefSum = [];
                    let pensionSum = [];
                    let nhisSum = [];
                    let lapSum = [];
                    let netTaxSum = [];
                    console.log("res", res);
                    let expTaxSum = [];
                    for (let i = 0; i < res.length; i++) {
                        let rec = res[i];
                        rec.salary = Number(rec.basic_salary);
                        rec.consolRel = Number(rec.con_rel_cal)
                        rec.pens = Number(rec.pension)
                        rec.nhisScheme = Number(rec.nhis)
                        rec.lapScheme = Number(rec.lap)
                        rec.netTax = Number(rec.net_tax_ded)
                        rec.expTax = Number(rec.tax_pay_cal)
                        reliefSum.push(rec.consolRel);
                        salarySum.push(rec.salary);
                        pensionSum.push(rec.pens);
                        nhisSum.push(rec.nhisScheme);
                        lapSum.push(rec.lapScheme);
                        netTaxSum.push(rec.netTax);
                        expTaxSum.push(rec.expTax);
                        rec.year = dateformat(rec.year, "yyyy");
                        rec.tax = parseInt(rec.tax);
                        rec.nhis = formatNumber(rec.nhis);
                        rec.lap = formatNumber(rec.lap);
                        rec.net_tax_ded = formatNumber(rec.net_tax_ded);
                        rec.tax_pay_cal = formatNumber(rec.tax_pay_cal);
                        rec.con_rel_cal = formatNumber(rec.con_rel_cal);
                        rec.basic_salary = formatNumber(rec.basic_salary);
                        rec.pension = formatNumber(rec.pension);
                        rec.name = rec.staff_names;
                        records.push(rec);
                    }

                    const totalSalary = salarySum.reduce(
                        (preVal, curVal) => preVal + curVal,
                        0
                    );
                    const totalConRel = reliefSum.reduce(
                        (preVal, curVal) => preVal + curVal,
                        0
                    );
                    const totalPension = pensionSum.reduce(
                        (preVal, curVal) => preVal + curVal,
                        0
                    );
                    const totalNHIS = nhisSum.reduce(
                        (preVal, curVal) => preVal + curVal,
                        0
                    );
                    const totalLAP = lapSum.reduce(
                        (preVal, curVal) => preVal + curVal,
                        0
                    );
                    const totalNetTax = netTaxSum.reduce(
                        (preVal, curVal) => preVal + curVal,
                        0
                    );
                    const totalExpTax = expTaxSum.reduce(
                        (preVal, curVal) => preVal + curVal,
                        0
                    );
                    sum.totalSalary = totalSalary;
                    sum.totalConRel = totalConRel;
                    sum.totalPension = totalPension;
                    sum.totalNHIS = totalNHIS;
                    sum.totalLAP = totalLAP;
                    sum.totalNetTax = totalNetTax;
                    sum.totalExpTax = totalExpTax;
                    setIsFetching(false);
                    setPost(() => records);
                    setTotal(() => sum);
                } catch (e) {
                    setIsFetching(false);
                }
            };
            fetchPost();
        }
    }, [router]);
  
    // Get current post
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const next = (currentPage) => setCurrentPage(() => currentPage + 1);
    const previous = (currentPage) => setCurrentPage(() => currentPage - 1);

    const searchHandler = (e) => {
        setQuery(() => e.target.value.toLowerCase());
    };

    let res = [];
    const search = (rows) => {
        let data = [];
        data = rows.filter((rows) => rows.name.toLowerCase().indexOf(query) > -1);
        res.push(data);
        return data;
    };

    const searchedPost = search(post).slice(indexOfFirstPost, indexOfLastPost);


    return (
        <>
            <SectionTitle title="View Uploads" subtitle="Annual PAYE Returns" />
            <div className="flex justify-between">
                <button
                    className="btn my-3 bg-purple-400 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                    onClick={() => router.back()}
                >
                    Back
                </button>
                <button
                    className="btn my-3 bg-purple-400 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                    onClick={() => router.push(`/paye-annual/view-docs/${routerKgtin}_${routerYear}_${status}`)}
                >
                    View Documents
                </button>

            </div>
            <p className="text-center font-bold">Year {routerYear} - {status} </p>
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
                    <p>Fetching data...</p>
                </div>
            )}
            <Widget>
                <div className="flex lg:flex-wrap w-full lg:space-x-4 justify-between items-center">
                    <div className="w-32">
                        <NewFormInput
                            label="Search by name"
                            required
                            onChange={searchHandler}
                        />
                    </div>
                </div>
                <div className="mt-4">
                   
                    {query !== "" ? (
                        <>
                            <AnnulCsv remittance={searchedPost} total={total} />
                            <CustomPagination
                                paginate={paginate}
                                totalPosts={res[0].length}
                                postPerPage={postPerPage}
                                currentPage={currentPage}
                                next={next}
                                previous={previous}
                            />
                        </>
                    ) : (
                        <>
                            <AnnulCsv remittance={currentPosts} total={total} />
                            <CustomPagination
                                paginate={paginate}
                                totalPosts={post.length}
                                postPerPage={postPerPage}
                                currentPage={currentPage}
                                next={next}
                                previous={previous}
                            />
                        </>
                    )}
                </div>
            </Widget>
        </>
    );
}
