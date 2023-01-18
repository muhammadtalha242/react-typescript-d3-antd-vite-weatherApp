import * as React from "react";
import { createRef } from "react";
import * as d3 from "d3";
// @ts-ignore
import { withSize } from "react-sizeme";

interface IValidatorChartProps {
    size: any;
}

interface IState {
    data : any[] | null;
}

class Chart extends React.Component<IValidatorChartProps, IState> {
    
    private xRef: React.RefObject<any> = createRef();
    private yRef: React.RefObject<any> = createRef();

    private margin = {
        top : 20,
        right: 20,
        bottom: 30,
        left: 50
    }

    private width : number;
    private height : number;
    private x : any
    private y : any
    private area : any;
    private valueline: any;

    constructor(props: IValidatorChartProps) {
        super(props);
        this.state = {
            data : null
        }
        this.width = 960 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;


        
    }
    

    public componentDidMount() {
        console.log("componentDidMount")

        const parseTime = d3.timeParse("%d-%b-%y");

        // set the ranges
        this.x = d3.scaleTime().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);

        const area = d3.area()
            .x((d:any)=> this.x(d.date))
            .y0(this.height)
            .y1((d:any)=> this.y(d.close))
        this.area = area;
        const valueline = d3.line()
            .x((d:any)=> this.x(d.date))
            .y((d:any)=> this.y(d.close));
        this.valueline = valueline;

        const rawData = d3.csvParse(this.getData());
        rawData.forEach((d: any) => {
            // date: d3.timeParse("%d-%b-%y")((d.date).replace(/\s/g, ""))
            d.date = parseTime((d.date).replace(/\s/g, ""));
            d.close = +d.close;
        })
        this.x.domain(d3.extent(rawData, (d : any) => d.date ));
        this.y.domain([0, d3.max(rawData, (d : any) => d.close )]);
        console.log('data->',rawData);
        
        this.setState({
            data : rawData
        })
    }



    public drawXAxis() {
        // @ts-ignore
        d3.select(this.xRef).call(d3.axisBottom(this.x));
    }

    public drawYAxis() {
        // @ts-ignore
        d3.select(this.yRef).call(d3.axisBottom(this.y));
    }
    
    public areaPath(){
        // @ts-ignore
        return (<path className="area" d={this.area(this.state.data)} />);
     }

     public linePath() {
        // @ts-ignore
        return (<path className="line" d={this.valueline(this.state.data)} />);
     }
    public render() {
        return (
            <svg width={this.width} height={this.height}>
                {this.state.data ? this.areaPath() : null}
                {this.state.data ? this.linePath() : null}
                <g ref={this.xRef} transform={`translate(0, ${this.height})`}/>
                <g ref={this.yRef}/>
            </svg>
        )
    }

    public getData() {
        return `date,close
        1-May-12,58.13
        30-Apr-12,53.98
        27-Apr-12,67.00
        26-Apr-12,89.70
        25-Apr-12,99.00
        24-Apr-12,130.28
        23-Apr-12,166.70
        20-Apr-12,234.98
        19-Apr-12,345.44
        18-Apr-12,443.34
        17-Apr-12,543.70
        16-Apr-12,580.13
        13-Apr-12,605.23
        12-Apr-12,622.77
        11-Apr-12,626.20
        10-Apr-12,628.44
        9-Apr-12,636.23
        5-Apr-12,633.68
        4-Apr-12,624.31
        3-Apr-12,629.32
        2-Apr-12,618.63
        30-Mar-12,599.55
        29-Mar-12,609.86
        28-Mar-12,617.62
        27-Mar-12,614.48
        26-Mar-12,606.98`
    }

}

const ValidatorChart = withSize()(Chart);

export { ValidatorChart };