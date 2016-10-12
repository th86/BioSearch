//  BioSearch
//  Hopefully this makes a bioinformatician's life easier.
//  It was developed based on several Google Extension examples and threads on Stack Overflow.
//  Tai-Hsien Ou Yang, 2016
//  The MIT License

var engineList = [  'GeneCards', 'UCSC Genome Browser (Human Hg38)', 'NCBI PubMed', 'BioStar', 'Stack Overflow'];
var engineAPI =  [  'http://www.genecards.org/cgi-bin/carddisp.pl?gene=',
                    'https://genome.ucsc.edu/cgi-bin/hgTracks?hgsid=542820935_k4orgjEGmg8fAAdIDKOmUzTIgBvG&org=Human&db=hg38&position=',
                    'http://www.ncbi.nlm.nih.gov/pubmed/?term=',
                    'https://www.biostars.org/local/search/page/?q=',
                    'http://stackoverflow.com/search?q=']

function SearchText(text, engineIdx){
    var sendTo = engineAPI[parseInt(engineIdx,10)] + text;
    chrome.tabs.create({url: sendTo}); //requires activeTab
}

for (var engineId = 0; engineId < engineList.length; engineId++) {
  var title = "Search on " + engineList[engineId];
  chrome.contextMenus.create({"title": title, 
                              "contexts":["selection"],
                              "onclick": function(info, tab){ SearchText(info.selectionText, info.menuItemId); }, //callback is fancy
                              "id": engineId.toString()  }
                              ); //requires contextMenus and background in manifest.json
}
