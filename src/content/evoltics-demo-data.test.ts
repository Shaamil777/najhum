import { describe, expect, it } from "vitest";
import { demoCsv, demoLocations, demoSessions, filterDemoRows, getDemoTotals, getDemoChart } from "./evoltics-demo-data";

describe("EVOLTICS local demo reports",()=>{
  it("combines a case-insensitive search with the selected session status",()=>{
    const result=filterDemoRows(demoSessions,"  demo DRIVER  ","Running");
    expect(result).toHaveLength(2);
    expect(result.every(row=>row.status==="Running")).toBe(true);
    expect(filterDemoRows(demoSessions,"unknown record","All")).toEqual([]);
  });
  it("reconciles location totals with the network and scales the report period",()=>{
    const network=getDemoTotals("All","Today");
    const locationTotals=demoLocations.map(l=>getDemoTotals(l.name,"Today"));
    expect(locationTotals.reduce((sum,l)=>sum+l.sessions,0)).toBe(network.sessions);
    expect(locationTotals.reduce((sum,l)=>sum+l.energy,0)).toBeCloseTo(network.energy);
    expect(network.revenue).toBeCloseTo(network.energy*1.2);
    expect(getDemoTotals("All","Last 7 days").energy).toBeCloseTo(network.energy*7);
    expect(getDemoTotals("missing","Today")).toEqual({energy:0,revenue:0,sessions:0,hours:0});
  });
  it("reconciles chart buckets with the selected report totals",()=>{
    const totals=getDemoTotals("City Mall","Last 7 days");
    expect(getDemoChart("City Mall","Last 7 days","Revenue").reduce((a,b)=>a+b,0)).toBeCloseTo(totals.revenue);
    expect(getDemoChart("City Mall","Last 7 days","Number of sessions").reduce((a,b)=>a+b,0)).toBe(totals.sessions);
  });
  it("exports quoted CSV and neutralises spreadsheet formula values",()=>{
    const csv=demoCsv([{key:"name",label:"Name"},{key:"note",label:"Note"}],[{id:"1",name:'A, "B"',note:'=HYPERLINK("example")'},{id:"2",name:"Plain",note:"Two\nlines"}]);
    expect(csv).toBe('"Name","Note"\r\n"A, ""B""","\'=HYPERLINK(""example"")"\r\n"Plain","Two\nlines"');
  });
});
