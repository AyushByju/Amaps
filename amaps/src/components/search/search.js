import React, { useEffect } from 'react';
import AzSearch from 'azsearch.js';
import { Automagic } from 'azsearch.js';


const SearchBox = () => {

  useEffect(() => {
    // Initialize and connect to your search service
    var automagic = new Automagic({ index: "cfinresourcefindersearchtext-index", queryKey: "UKJSOgxAHhX1vs7N80HfbgVbuwbcr9JpLLTpWoFg4iAzSeAFhFda", service: "cfinassetsmapsearch", dnsSuffix:"search.windows.net" });

    const resultTemplate = `<div class="col-xs-12 col-sm-3 col-md-3 result_img" >
        <img class="img-responsive result_img" src={{thumbnail}} alt="image not found" />
    </div>
    <div class="col-xs-12 col-sm-9 col-md-9">
        <h4>{{Company_Name}}</h4>
        <div class="resultDescription">{{{Description}}}</div>
    </div>`;

    // Add a results view using the template defined above
    automagic.addResults("results", { count: true }, resultTemplate);

    // Adds a pager control << 1 2 3 ... >>
    automagic.addPager("pager");

    // Set some processors to format results for display
    var suggestionsProcessor = function (results) {
        return results.map(function (result) {
            result.searchText = result["@search.text"];
            return result;
        });
    };

    automagic.store.setSuggestionsProcessor(suggestionsProcessor);

    var suggestionsTemplate = `
        <h4> Company_Name: {{Company_Name}} </h4>
        <p> Product_or_Service: {{Product_or_Service}} </p>
        <p> {{Business_Type}} </p>
        <p> City: {{City}} </p> {{{searchText}}}`;

    // Add a search box that uses suggester "cfinresourcefindersearchtext", grabbing some additional fields to display during suggestions. Use the template defined above
    automagic.addSearchBox("searchBox",
        {
            highlightPreTag: "<b>",
            highlightPostTag: "</b>",
            suggesterName: "cfinresourcefindersearchtext",
            select: "Company_Name,Product_or_Service,Business_Type,City"
        },
        "",
        suggestionsTemplate);

    automagic.addCheckboxFacet("Product_or_ServiceFacet", "Product_or_Service", "string");
    automagic.addCheckboxFacet("Business_TypeFacet", "Business_Type", "string");
    automagic.addCheckboxFacet("CFIN_CategoryFacet", "CFIN_Category", "string");
    automagic.addCheckboxFacet("NAICSFacet", "NAICS", "string");
    automagic.addCheckboxFacet("ProvinceFacet", "Province", "string");
    automagic.addCheckboxFacet("CityFacet", "City", "string");
    automagic.addCheckboxFacet("keyphrasesFacet", "keyphrases", "collection");

    // Adds a button to clear any applied filters
    automagic.addClearFiltersButton("clearFilters");

  }, []);

  return (
    <div>
      <div id="searchBox"></div>
      <div id="results"></div>
      <div id="pager"></div>
      <div id="clearFilters"></div>
      <div id="Product_or_ServiceFacet"></div>
      <div id="Business_TypeFacet"></div>
      <div id="CFIN_CategoryFacet"></div>
      <div id="NAICSFacet"></div>
      <div id="ProvinceFacet"></div>
      <div id="CityFacet"></div>
      <div id="keyphrasesFacet"></div>
    </div>
  );
}

export default SearchBox;
