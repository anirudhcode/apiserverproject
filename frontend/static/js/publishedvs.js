// console.log("publishedvs.js loaded");


// d3.json("http://127.0.0.1:8000/api/data/overviewpublished", function(data) {
    
//     // Group data by dates and count occurrences for each date
//     var publishedDateCounts = d3.nest()
//         .key(function(d) { return d3.timeParse("%Y-%m-%d")(d.published.slice(0, 10)); })
//         .rollup(function(v) { return v.length; })
//         .entries(data);
  
//     var addedDateCounts = d3.nest()
//         .key(function(d) { return d3.timeParse("%Y-%m-%d")(d.added.slice(0, 10)); })
//         .rollup(function(v) { return v.length; })
//         .entries(data);
  
//     // Sort both data sets in descending order of count
//     publishedDateCounts.sort(function(a, b) { return b.value - a.value; });
//     addedDateCounts.sort(function(a, b) { return b.value - a.value; });
  
//     // Create separate SVG elements for each chart
//     var svgPublished = d3.select("svg#published");
//     var svgAdded = d3.select("svg#added");
  
//     // Create the first bar graph (published dates)
//     var marginPublished = {top: 20, right: 20, bottom: 30, left: 40};
//     var widthPublished = +svgPublished.attr("width") - marginPublished.left - marginPublished.right;
//     var heightPublished = +svgPublished.attr("height") - marginPublished.top - marginPublished.bottom;
  
//     var xPublished = d3.scaleBand()
//         .domain(publishedDateCounts.map(function(d) { return d.key; }))
//         .range([0, widthPublished]);
  
//     var yPublished = d3.scaleLinear()
//         .domain([0, d3.max(publishedDateCounts, function(d) { return d.value; })])
//         .range([heightPublished, 0]);
  
//     svgPublished.append("g")
//         .attr("transform", "translate(" + marginPublished.left + "," + marginPublished.top + ")")
//         .selectAll(".bar")
//         .data(publishedDateCounts)
//         .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", function(d) { return xPublished(d.key); })
//         .attr("y", function(d) { return yPublished(d.value); })
//         .attr("width", xPublished.bandwidth())
//         .attr("height", function(d) { return heightPublished - yPublished(d.value); });
  
//     svgPublished.append("g")
//         .attr("transform", "translate(" + marginPublished.left + "," + (heightPublished + marginPublished.top) + ")")
//         .call(d3.axisBottom(xPublished));
  
//     svgPublished.append("g")
//         .call(d3.axisLeft(yPublished));

//   });


const svg = d3.select("svg"),
    margin = 50,
    width = svg.attr("width") - 2 * margin,
    height = svg.attr("height") - 2 * margin;

const xScalePublished = d3.scaleBand().range([0, width]).padding(0.2),
    yScalePublished = d3.scaleLinear().range([height, 0]);

const xScaleAdded = d3.scaleBand().range([0, width]).padding(0.2),
    yScaleAdded = d3.scaleLinear().range([height, 0]);

const gPublished = svg.append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")");

const gAdded = svg.append("g")
    .attr("transform", "translate(" + (margin + width + 50) + "," + margin + ")");

// Replace this URL with the actual API URL
const apiUrl = 'http://127.0.0.1:8000/api/data/overviewpublished?limit=10';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (!data || !Array.isArray(data)) {
            throw new Error('Invalid data format');
        }
        drawChart(data);
    })
    .catch(error => {
        console.error('Error fetching or processing data:', error);
    });

function drawChart(data) {
    // Handle null values and filter out invalid data
    const validData = data.filter(article => article.published && article.added);

    // Extract the published and added dates
    const publishedDates = validData.map(article => article.published ? article.published.slice(0, 10) : null);
    const addedDates = validData.map(article => article.added ? article.added.slice(0, 10) : null);

        // Count the number of articles published and added on each date
        const articlesByDate = d3.nest()
            .key(d => d)
            .rollup(leaves => {
                const dateObj = new Date(leaves[0].published);
                return {
                    date: dateObj,
                    published: leaves.filter(article => new Date(article.published) <= dateObj).length,
                    added: leaves.filter(article => new Date(article.added) <= dateObj).length
                };
            })
            .entries(publishedDates.filter(d => d) !== null ? publishedDates : addedDates)
            .sort((a, b) => b.value.published - a.value.published);

        // Set the scales for the published graph
        xScalePublished.domain(articlesByDate.map(d => d.key.slice(0, 10)));
        yScalePublished.domain([0, d3.max(articlesByDate, d => d.value.published)]);

        // Draw the published graph
        gPublished.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScalePublished));

        gPublished.append("g")
            .call(d3.axisLeft(yScalePublished))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .text("Number of Articles");

        gPublished.selectAll(".bar")
            .data(articlesByDate)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => xScalePublished(d.key.slice(0, 10)))
            .attr("y", d => yScalePublished(d.value.published))
            .attr("width", xScalePublished.bandwidth())
            .attr("height", d => height - yScalePublished(d.value.published));

        // Set the scales for the added graph
        xScaleAdded.domain(d3.nest()
        .key(d => d.date.toISOString().slice(0, 10))
        .rollup(leaves => d3.max(leaves, d => d.added))
        .entries(addedDates)
        .sort((a, b) => b.value - a.value)
        .map(d => d.key));

        yScaleAdded.domain([0, d3.max(addedDates, d => d.added)]);

        // Draw the added graph
        gAdded.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScaleAdded));

        gAdded.append("g")
            .call(d3.axisLeft(yScaleAdded))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .text("Number of Articles");

        gAdded.selectAll(".bar")
            .data(d3.nest()
                .key(d => d.date.toISOString().slice(0, 10))
                .rollup(leaves => {
                    return {
                        date: leaves[0].date,
                        added: d3.max(leaves, d => d.added)
                    };
                })
                .entries(addedDates)
                .sort((a, b) => b.value.added - a.value.added))
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => xScaleAdded(d.value.date.toISOString().slice(0, 10)))
            .attr("y", d => yScaleAdded(d.value.added))
            .attr("width", xScaleAdded.bandwidth())
            .attr("height", d => height - yScaleAdded(d.value.added));
    };