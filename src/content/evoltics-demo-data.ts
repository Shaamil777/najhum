// Local illustrative records. No account credentials, customer records or live API calls.
export type ConnectorStatus = "Available" | "Charging" | "Plugged-In" | "Offline";
export type DemoView = "Dashboard" | "Locations" | "Chargers" | "Sessions" | "Carbon credits" | "Payments" | "Users" | "Groups" | "Assets" | "Plans" | "RFID" | "Plugin";
export type DemoRow = { id: string; [key: string]: string };
export const demoLocations = [
  {id:"LOC-01",name:"Design District",city:"Dubai",chargers:4,x:41,y:42},
  {id:"LOC-02",name:"City Mall",city:"Ajman",chargers:3,x:62,y:22},
  {id:"LOC-03",name:"Village Residences",city:"Dubai",chargers:3,x:47,y:53},
  {id:"LOC-04",name:"Hills Retail",city:"Dubai",chargers:3,x:36,y:64},
  {id:"LOC-05",name:"Business Park",city:"Dubai",chargers:2,x:57,y:43},
  {id:"LOC-06",name:"East Coast Hub",city:"Fujairah",chargers:2,x:80,y:39},
  {id:"LOC-07",name:"Central Square",city:"Abu Dhabi",chargers:3,x:21,y:74},
  {id:"LOC-08",name:"Innovation Campus",city:"Sharjah",chargers:1,x:68,y:29},
];
export const demoChargers = demoLocations.flatMap((location,locationIndex)=>Array.from({length:location.chargers},(_,i)=>({
  id:`CH-${String(locationIndex+1).padStart(2,"0")}-${i+1}`,location:location.name,city:location.city,
  status: (["Charging","Available","Offline","Available","Plugged-In","Charging","Available"] as ConnectorStatus[])[(locationIndex*3+i)%7],
  connectors:i===0 && locationIndex<2?2:1,power:i%3===0?120:22,visibility:"Visible",accessibility:i===2?"Private":"Public",
})));
export const demoSessions: DemoRow[] = Array.from({length:24},(_,i)=>{
  const charger=demoChargers[i%demoChargers.length]; const energy=Number((12.4+(i*7.3)%49).toFixed(2));
  return {id:`SE-${String(1200+i)}`,charger:charger.id,location:charger.location,user:`Demo driver ${String(i+1).padStart(2,"0")}`,vehicle:["Electric sedan","Electric SUV","Electric van"][i%3],start:`17 Oct 2026 · ${String(i%24).padStart(2,"0")}:${i%2===0?"15":"45"}`,duration:`${22+i*3} min`,status:i<2?"Running":"Completed",energy:energy.toFixed(2),revenue:(energy*1.2).toFixed(2),pricing:"AED 1.20 / kWh",reason:i<2?"—":"EV disconnected"};
});
export const tableDefinitions: Record<Exclude<DemoView,"Dashboard">,{columns:{key:string;label:string}[];rows:DemoRow[];addLabel?:string}> = {
  Locations:{columns:[{key:"id",label:"Location ID"},{key:"name",label:"Location"},{key:"city",label:"City"},{key:"chargers",label:"Chargers"},{key:"accessibility",label:"Accessibility"},{key:"status",label:"Status"}],rows:demoLocations.map(l=>({id:l.id,name:l.name,city:l.city,chargers:String(l.chargers),accessibility:"Public",status:"Active"})),addLabel:"Add location"},
  Chargers:{columns:[{key:"id",label:"Charger ID"},{key:"location",label:"Location"},{key:"status",label:"Connector status"},{key:"connectors",label:"Connectors"},{key:"visibility",label:"Visibility"},{key:"accessibility",label:"Accessibility"},{key:"power",label:"Max. power (kW)"}],rows:demoChargers.map(c=>({...c,connectors:String(c.connectors),power:String(c.power)})),addLabel:"Add charger"},
  Sessions:{columns:[{key:"id",label:"ID"},{key:"charger",label:"Charger"},{key:"user",label:"User"},{key:"vehicle",label:"Vehicle"},{key:"start",label:"Start date & time"},{key:"duration",label:"Duration"},{key:"status",label:"Status"},{key:"energy",label:"Energy (kWh)"},{key:"revenue",label:"Revenue (AED)"},{key:"pricing",label:"Pricing"},{key:"reason",label:"Stop reason"}],rows:demoSessions},
  "Carbon credits":{columns:[{key:"id",label:"Record"},{key:"location",label:"Location"},{key:"energy",label:"Energy (kWh)"},{key:"factor",label:"Illustrative factor (kg/kWh)"},{key:"avoided",label:"CO₂ avoided (kg)"},{key:"status",label:"Status"}],rows:demoLocations.map((l,i)=>({id:`CC-00${i+1}`,location:l.name,energy:String(1120+i*210),factor:"0.4",avoided:((1120+i*210)*.4).toFixed(1),status:"Estimated"}))},
  Payments:{columns:[{key:"id",label:"Transaction"},{key:"session",label:"Session"},{key:"location",label:"Location"},{key:"date",label:"Date"},{key:"amount",label:"Amount (AED)"},{key:"method",label:"Method"},{key:"status",label:"Status"}],rows:demoSessions.slice(2,14).map((s,i)=>({id:`TX-${3100+i}`,session:s.id,location:s.location,date:"17 Oct 2026",amount:s.revenue,method:i%2?"Card":"Wallet",status:i%5===0?"Pending":"Settled"}))},
  Users:{columns:[{key:"id",label:"User ID"},{key:"name",label:"Name"},{key:"role",label:"Role"},{key:"group",label:"Group"},{key:"status",label:"Status"}],rows:Array.from({length:8},(_,i)=>({id:`DU-00${i+1}`,name:`Demo ${i<2?"operator":"driver"} ${i+1}`,role:i===0?"Admin":i===1?"Manager":"Customer",group:i<2?"Operations":"Fleet",status:"Active"})),addLabel:"Add demo user"},
  Groups:{columns:[{key:"id",label:"Group ID"},{key:"name",label:"Group"},{key:"members",label:"Members"},{key:"accessibility",label:"Access"},{key:"status",label:"Status"}],rows:[{id:"GR-01",name:"Operations",members:"2",accessibility:"All locations",status:"Active"},{id:"GR-02",name:"Fleet",members:"6",accessibility:"Assigned chargers",status:"Active"}],addLabel:"Add group"},
  Assets:{columns:[{key:"id",label:"Asset ID"},{key:"name",label:"Asset"},{key:"type",label:"Type"},{key:"location",label:"Location"},{key:"status",label:"Status"}],rows:demoChargers.slice(0,6).map((c,i)=>({id:`AS-00${i+1}`,name:`Charging unit ${i+1}`,type:i%2?"AC charger":"DC charger",location:c.location,status:c.status})),addLabel:"Add asset"},
  Plans:{columns:[{key:"id",label:"Plan ID"},{key:"name",label:"Plan"},{key:"price",label:"Price / kWh"},{key:"fee",label:"Session fee"},{key:"accessibility",label:"Access"},{key:"status",label:"Status"}],rows:[{id:"PU-0001",name:"Public standard",price:"AED 1.20",fee:"AED 0.00",accessibility:"Public",status:"Active"},{id:"PU-0002",name:"Fleet members",price:"AED 0.95",fee:"AED 0.00",accessibility:"Private",status:"Active"},{id:"PU-0003",name:"Destination charging",price:"AED 1.00",fee:"AED 2.00",accessibility:"Public",status:"Active"}],addLabel:"Create plan"},
  RFID:{columns:[{key:"id",label:"Tag ID"},{key:"name",label:"Label"},{key:"user",label:"Assigned user"},{key:"group",label:"Group"},{key:"status",label:"Status"}],rows:Array.from({length:6},(_,i)=>({id:`DEMO-TAG-0${i+1}`,name:`Fleet tag ${i+1}`,user:`Demo driver ${i+1}`,group:"Fleet",status:i===5?"Inactive":"Active"})),addLabel:"Add RFID"},
  Plugin:{columns:[{key:"id",label:"Integration ID"},{key:"name",label:"Integration"},{key:"type",label:"Connection"},{key:"status",label:"Status"}],rows:[{id:"INT-01",name:"OCPP charger network",type:"OCPP",status:"Connected"},{id:"INT-02",name:"Business reporting",type:"CSV export",status:"Connected"},{id:"INT-03",name:"Payment gateway",type:"Demo integration",status:"Configured"}],addLabel:"Add integration"},
};
export function filterDemoRows(rows:DemoRow[],search:string,status:string){const query=search.trim().toLowerCase();return rows.filter(row=>(status==="All" || row.status===status) && (!query || Object.values(row).some(value=>value.toLowerCase().includes(query))));}
export function demoCsv(columns:{key:string;label:string}[],rows:DemoRow[]){
  const quote=(value:string)=>`"${value.replaceAll('"','""')}"`;
  return [columns.map(c=>quote(c.label)).join(','),...rows.map(row=>columns.map(c=>quote(/^[=+@\-]/.test(row[c.key]??'')?`'${row[c.key]}`:row[c.key]??'')).join(','))].join('\r\n');
}
export function getDemoTotals(location:string,period:string){
 const rows=demoSessions.filter(s=>location==='All' || s.location===location);const factor=period==='Last 7 days'?7:period==='Last 30 days'?30:1;
 const energy=rows.reduce((sum,row)=>sum+Number(row.energy),0)*factor;
 return {energy,revenue:energy*1.2,sessions:rows.length*factor,hours:rows.reduce((sum,row)=>sum+parseFloat(row.duration)/60,0)*factor};
}

export function getDemoChart(location:string,period:string,metric:string){
  const factor=period==='Last 7 days'?7:period==='Last 30 days'?30:1;
  const buckets=Array<number>(12).fill(0);
  demoSessions.filter(row=>location==='All'||row.location===location).forEach(row=>{
    const hour=Number(row.start.split(' · ')[1].split(':')[0]);
    const value=metric==='Revenue'?Number(row.revenue):metric==='Sessions (hrs.)'?parseFloat(row.duration)/60:metric==='Number of sessions'?1:Number(row.energy);
    buckets[Math.floor(hour/2)]+=value*factor;
  });
  return buckets;
}
