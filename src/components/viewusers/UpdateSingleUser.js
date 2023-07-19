import SectionTitle from "../section-title";
import Widget from "../widget";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import Loader from "react-loader-spinner";
import UpdateUser from "../tables/viewUsers";


const UpdateSingleUser = () => {
  const [user, setUser] = useState([]);
  const [groups, setGroups] = useState([]);

  const [isFetching, setIsFetching] = useState(() => true);

  const router = useRouter();
  useEffect(() => {
    if (router && router.query) {
      let useEmail = router.query.ref;
      let email = {
        "email": `${useEmail}`
      }
      setAuthToken();
      const fetchPost = async () => {
        try {
          let res = await axios.post(
            `${url.BASE_URL}user/user`, email
          );
          res = res.data.body;
          let userDet = res.user
          let userGrp = res.groups
          console.log(res);
          setUser(userDet)
          setGroups(userGrp)
          setIsFetching(false);
        } catch (e) {
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [router]);



  return (
    <>
      <SectionTitle subtitle="Edit User" />

      <Widget>

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
          ) :
            <UpdateUser user={user} groups={groups}/>
          }
        </>
      </Widget>
    </>
  );
};

export default UpdateSingleUser;
