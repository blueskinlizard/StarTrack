import { useState, useEffect } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Search, Star, Zap, Activity, Target, TrendingUp, Info, Database, Sparkles } from 'lucide-react';
import InfoCard from "./InfoCard";
import MetricCard from "./MetricCard";

export default function StarTrackPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // API call on search nothing special
    const handleSearch = async () => {
      setLoading(true);
      try{
        const fetchedSearchDataStarJson = await fetch('http://localhost:8080/api/findStar', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchedStar: searchTerm })
        });
        if(fetchedSearchDataStarJson.ok){
          const fetchedSearchDataStar = await fetchedSearchDataStarJson.json();
          setSearchResults(fetchedSearchDataStar);
          console.log(fetchedSearchDataStar); // Debug yk
          setLoading(false);
        }
      }catch(error){
        console.error("Error searching for star", error);
        setLoading(false);
      }
    };

    if(searchTerm){
      handleSearch();
    }
  }, [searchTerm]);

  // Prepare our chart data for flux, spectralproperties, etc.
  const fluxData = searchResults ? [
    { band: 'u', flux: searchResults.u_flux, color: '#8B5CF6' },
    { band: 'g', flux: searchResults.g_flux, color: '#06B6D4' },
    { band: 'r', flux: searchResults.r_flux, color: '#10B981' },
    { band: 'i', flux: searchResults.i_flux, color: '#F59E0B' },
    { band: 'z', flux: searchResults.z_flux, color: '#EF4444' }] : [];

  const spectralProperties = searchResults ? [
    { property: 'Temperature', value: searchResults.ELODIE_TEFF, fullMark: 10000 },
    { property: 'Surface Gravity', value: Math.abs((searchResults.ELODIE_LOGG || 0) * 1000), fullMark: 5000 },
    { property: 'Metallicity', value: Math.abs((searchResults.ELODIE_FEH || 0) * 1000), fullMark: 1000 },
    { property: 'Redshift', value: (searchResults.Z || 0) * 10000, fullMark: 1000 },
    { property: 'Velocity Disp.', value: searchResults.VDISP, fullMark: 200 }] : [];

  if(loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div> {/* I love this sm */}
          <h2 className="text-xl font-semibold text-gray-700">Analyzing Stellar Data...</h2>
          <p className="text-gray-500 mt-2">Searching through our cosmic CSV's</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-indigo-600"/> {/* Ok side note can we just talk about how amazing lucide iss I haven't even used it before this project */}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">StarTrack</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Search StarTrack</h2>
            <p className="text-gray-600">Enter PLATE-MJD-FIBERID to find stellar data</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400"/>
              </div>
              <input id="userSearchInput" name="userSearchInput" type="text" placeholder="e.g., 7495-57023-123" className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              onKeyPress={(e) => { // Idc that this is depracated I still use this
                // Search function nothing special
                if(e.key === 'Enter') {
                  setSearchTerm(e.target.value);
                } // This formatting feels kinda weird but idk why ngl
                }}/>
              <button
                onClick={() => {
                  const input = document.getElementById('userSearchInput');
                  setSearchTerm(input.value);
                }}
                className="absolute inset-y-0 right-0 flex items-center px-6 bg-indigo-600 text-white rounded-r-xl hover:bg-indigo-700 transition-colors duration-200">Search</button>
            </div>
          </div>
        </div>

        {searchResults && (
          <div className="space-y-8">
            {/* Our list of big data*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <InfoCard title="ACTUAL Spectral Type" value={searchResults.SPECTRAL_GROUP} subtitle={`Temperature: ${Number(searchResults.ELODIE_TEFF).toFixed(3)}K`} 
              icon={Star} color="purple"/> {/* Before making these values numbers and clipping they would overflow*/}
              <InfoCard title="What our Model Predicted" value={searchResults.predicted_label} subtitle={`Confidence: ${(searchResults.predicted_confidence * 100).toFixed(1)}%`} 
              icon={Target}color="blue"/>
              <InfoCard title="Data Quality" value={searchResults.High_Quality ? "High" : "Standard"} subtitle={`S/N Ratio: ${Number(searchResults.SN_MEDIAN_ALL).toFixed(4)}`} // Yet again this nearly overflowed the container
              icon={Activity} color="green"/>
              <InfoCard title="Redshift" value={searchResults.Z ? Number(searchResults.Z).toFixed(4) : 'N/A'} subtitle={searchResults.Z_ERR ? `±${Number(searchResults.Z_ERR).toFixed(6)}` : '±N/A'} 
              icon={TrendingUp} color="amber"/>
            </div>

            {/* The visual charts on our page*/}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* The flux distribution chart*/}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><Zap className="w-5 h-5 mr-2 text-indigo-600"/>Photometric Flux Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={fluxData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="band"/>
                    <YAxis/>
                    <Tooltip contentStyle={{backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #e5e7eb', borderRadius: '8px'}}/>
                    <Bar dataKey="flux" fill="#4F46E5" radius={[4, 4, 0, 0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Our radar of spectral properties */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><Activity className="w-5 h-5 mr-2 text-purple-600"/>Spectral Properties</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={spectralProperties}>
                    <PolarGrid stroke="#e5e7eb"/>
                    <PolarAngleAxis dataKey="property" tick={{ fontSize: 12 }}/>
                    <PolarRadiusAxis angle={90} domain={[0, 'dataMax']} tick={false}/>
                    <Radar name="Properties" dataKey="value" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} strokeWidth={2}/>
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Our metrics grid for everything else */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center"><Database className="w-6 h-6 mr-3 text-indigo-600"/>Detailed Spectroscopic Parameters</h3>
              {/* I'm so sorry to anyone reading this code, if you're a professor seeing this horrible chunk, please don't judge me, I was just a bit too tired to code a foreach so I just copied and pasted each card*/}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                <MetricCard label="Plate ID" value={searchResults.PLATE}/>
                <MetricCard label="MJD" value={searchResults.MJD}/>
                <MetricCard label="Fiber ID" value={searchResults.FIBERID}/>
                <MetricCard label="Temperature" value={Number(searchResults.ELODIE_TEFF).toFixed(3)} unit="K"/> {/* Yet another overflow yk */}
                <MetricCard label="Log(g)" value={searchResults.ELODIE_LOGG} format="decimal"/>
                <MetricCard label="[Fe/H]" value={searchResults.ELODIE_FEH} format="decimal"/>
                <MetricCard label="Redshift" value={searchResults.Z} format="decimal"/>
                <MetricCard label="Z Error" value={searchResults.Z_ERR} format="scientific"/>
                <MetricCard label="Vel. Disp." value={searchResults.VDISP} unit=" km/s"/>
                <MetricCard label="VDISP Error" value={searchResults.VDISP_ERR} format="decimal"/>
                <MetricCard label="S/N Median" value={searchResults.SN_MEDIAN_ALL} format="decimal"/>
                <MetricCard label="Reduced χ²" value={searchResults.RCHI2} format="decimal"/>
                <MetricCard label="DOF" value={searchResults.DOF}/>
                <MetricCard label="SNR Bin" value={searchResults.SNR_Bin}/>
                <MetricCard label="Mean Flux" value={searchResults.Mean_Flux} format="scientific"/>
                <MetricCard label="Flux/Noise" value={searchResults.Flux_to_Noise} format="decimal"/>
                <MetricCard label="Flux Std" value={searchResults.flux_std} format="scientific"/>
                <MetricCard label="Flux Min" value={searchResults.flux_min} format="scientific"/>
                <MetricCard label="Flux Max" value={searchResults.flux_max} format="scientific"/>
                <MetricCard label="Flux Median" value={searchResults.flux_median} format="scientific"/>
                <MetricCard label="Flux P25" value={searchResults.flux_p25} format="scientific"/>
                <MetricCard label="Flux P75" value={searchResults.flux_p75} format="scientific"/>
                <MetricCard label="Pred. Class" value={searchResults.predicted_class}/>
                <MetricCard label="Confidence" value={(searchResults.predicted_confidence * 100).toFixed(1)} unit="%"/>
              </div>
            </div>

            {/* Other model info */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-xl p-6 border border-indigo-200">
              <div className="flex items-center justify-between">
                <div><h3 className="text-lg font-semibold text-gray-900 flex items-center">Classification Model</h3>
                  <p className="text-gray-600 mt-1">Model: {searchResults.model}</p> 
                  {/* Ok so for my dear code reader that might not understand why we have listed the type of model, let me explain:
                  1. There wasn't enough spectra data available to match the sheer quantity of tabular metadata available, so the two models trained were done so on different datasets.
                  2. All of our stellar spectral data COMES from the tabular metadata (plate-mjd-fiberid) when we were collecting data, so out of all of our tabular data, a small portion was used to fetch spectral data
                  3. As a result, our fusion model can only be utilized on the subset of spectral data available (~23k examples), but our tabular model can be used on every example
                  4. To signify which model was used (Because this project is a learning experience for me and not a deployable fullstack app), it's quality of life to put what model was used
                  */}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Warning Flag</div>
                  <div className={`text-lg font-bold ${searchResults.ZWARNING === 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {searchResults.ZWARNING === 0 ? 'Clear' : `Warning: ${searchResults.ZWARNING}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}