import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis";
import CountrySelector from "./components/CountrySelector";
import HighLight from "./components/HighLight";
import Summary from "./components/Summary";

function App() {

  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries()
      .then(res => {
        // console.log(res.data);
        setCountries(res.data);

        setSelectedCountryId('vn');
      })
  },[])

  const handleOnChange = (e) =>{
    setSelectedCountryId(e.target.value);
  }

  useEffect(() => {
    if(selectedCountryId){
      // call Api
      const { Slug } = countries.find((country) => country.ISO2.toLowerCase() === selectedCountryId)

      getReportByCountry(Slug).then((res) => {
        // remove last item of data 

        // console.log(Slug);
        // console.log(res);
        if(res.data.length){
          res.data.pop();
          setReport(res.data);
        }
      })
    }
  },[countries, selectedCountryId])

  return (
    <div >
      <Container>
        <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryId}/>
        <HighLight report={report}/>
        <Summary report={report} selectedCountryId={selectedCountryId}/>
      </Container>
    </div>
  );
}

export default App;
