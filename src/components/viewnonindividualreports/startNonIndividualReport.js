import Widget from '../widget'
import SectionTitle from '../section-title';
import { StartAssessment } from '../assessment/viewAssessment';
import { useEffect } from 'react';
import setAuthToken from '../../functions/setAuthToken';
import { StartTcc } from '../tccForms/viewTccForms';
import { StartReportView } from '../tables/reports';
import { ViewTccPrintTable } from '../tables/viewTccTablePrint';
import { StartIndividualReportView } from '../tables/individualreports';
import { StartNonIndividualReportView } from '../tables/nonindividualreports';

const StartNonindividualReport = () => {
  useEffect(() => {
    setAuthToken();
    const fetchPost = async () => {
      try {


      } catch (e) {


      }
    };
    fetchPost();
  }, []);

  return (
    <>
      <SectionTitle title="Non-Individual" />

      
        <>
          <StartNonIndividualReportView />
        </>
      
    </>
  );
}
export default StartNonindividualReport