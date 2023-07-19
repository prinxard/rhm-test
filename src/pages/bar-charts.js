import SectionTitle from '../components/section-title'
import Bar from '../components/charts/bar'
import Bar2 from '../components/charts/bar-2'
import Bar3 from '../components/charts/bar-3'
import HorizontalBar from '../components/charts/horizontal-bar'
import HorizontalBar1 from '../components/charts/horizontal-bar-1'
import { RechartsBar1 } from '../components/recharts/bar-1'
import Widget from '../components/widget'
import Pie from '../components/charts/pie'

const Index = () => (
  <>
    <SectionTitle subtitle="Dashboard" />
    <div className="flex flex-col">
      <div className="w-full">
        <Widget
          // title="Direct Assessment Dashboard"
          description={
            <span>
              DA Dashboard
            </span>
          }>
          <div className="w-full mb-4">
            <RechartsBar1 height={200} />
          </div>
          {/* <Widget
            title="Doughnut chart"
            description={
              <span>
                Use the <code>&lt;Doughnut /&gt;</code> component for doughnut charts
              </span>
            }>
            <Pie height={250} />
          </Widget> */}
          {/* <div className="w-full mb-4">
            <Bar height={200} />
          </div>
          <div className="w-full mb-4">
            <Bar3 />
          </div> */}
        </Widget>
      </div>
      {/* <div className="w-full">
        <Widget
          title="Stacked bar chart"
          description={
            <span>
              Use the following examples as starting points for stacked bar
              charts
            </span>
          }>
          <Bar2 />
        </Widget>
      </div> */}
      {/* <div className="w-full">
        <Widget
          title="Horizontal bar chart"
          description={
            <span>
              Use the following examples as starting points for horizontal bar
              charts
            </span>
          }>
          <div className="w-full mb-4">
            <HorizontalBar />
          </div>
          <div className="w-full mb-4">
            <HorizontalBar1 />
          </div>
        </Widget>
      </div> */}
    </div>
  </>
)

export default Index
