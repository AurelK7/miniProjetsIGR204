

const margin = {top: 50, right: 0, bottom: 70, left: 30},
    swarmSpace = 200,
    width = 25000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


const svg = d3.select("body").append("svg")
    .attr("id", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom+20)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


const gap = height + margin.top + 50
const svg2 = d3.select("body").append("svg")
    .attr("id", "svg2")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + (50) + ")");


let dataset = [];
let girlSet = [];
let boySet = [];

var rowConverter = function(d) {
    if (d.preusuel != '_PRENOMS_RARES' && d.preusuel.length > 1 && d.annais != 'XXXX' && d.dpt != 'XX')
    {
        return {
            sexe : +d.sexe,
            preusuel : d.preusuel,
            annais : +d.annais,
            dpt : +d.dpt,
            nombre : +d.nombre
        };
    }
    };

//Data Loader

d3.dsv(';',"data/dpt2020.csv", rowConverter).then((rows) => {
        console.log(`Loaded ${rows.length} rows`);
        if (rows.length > 0){
            console.log("First row: ", rows[0]);
            console.log("Last row: ", rows[rows.length-1]);
            dataset = rows;

            boysDataset = dataset.filter(function(d){ return d.sexe == 1 });
            girlsDataset = dataset.filter(function(d){ return d.sexe == 2 });

            var boysByYear = d3.rollup(boysDataset, v => d3.sum(v, d => d.nombre), d=>d.annais, d=>d.preusuel);
            var girlsByYear = d3.rollup(girlsDataset, v => d3.sum(v, d => d.nombre), d=>d.annais, d=>d.preusuel);

            var boysTree = d3.hierarchy(boysByYear);
            var girlsTree = d3.hierarchy(girlsByYear);

            var boysSorted = boysTree.sort((a, b) => d3.descending(a.data[1], b.data[1]));
            var girlsSorted = girlsTree.sort((a, b) => d3.descending(a.data[1], b.data[1]));
            
            //Interaction : get year value

            

        

            // Processing data 
            top_x = 4; // On affiche le top 4

            for (let i = 0; i < girlsSorted.children.length; i++) {
                for (let j = 0; j < top_x; j++)
                {
                    girlSet.push({"year": girlsSorted.children[i].data[0],
                            "rank": j+1,
                            "name": girlsSorted.children[i].children.slice(0,top_x)[j].data[0],
                            "count": girlsSorted.children[i].children.slice(0,top_x)[j].data[1]
                    });
                }
            }
            

            for (let i = 0; i < boysSorted.children.length; i++) {
                for (let j = 0; j < top_x; j++)
                {
                    boySet.push({"year": boysSorted.children[i].data[0],
                            "rank": j+1,
                            "name": boysSorted.children[i].children.slice(0,top_x)[j].data[0],
                            "count": boysSorted.children[i].children.slice(0,top_x)[j].data[1]
                    });
                }
            }

            filtered_boys = boySet
                .filter(d => d.year > 1900)
                .filter(d => d.name.toUpperCase())
                .filter(d => d.year < 2018)
            filtered_boys.sort((a,b) => a.year - b.year)
           

            filtered_girls = girlSet
                .filter(d => d.year > 1900)
                .filter(d => d.year < 2018)
                .filter(d => d.name.toUpperCase())
            filtered_girls.sort((a,b) => a.year - b.year)

            let years = Array.from(new Set(filtered_boys.map(d => d.year)));

            let boysNames = Array.from(new Set(filtered_boys.map(d => d.name)));

            let girlsNames = Array.from(new Set(filtered_girls.map(d => d.name)));

            radius = 30;
            side   = 2 * radius * Math.cos(Math.PI / 4);
            
            let xCoords = years.map((d, i) => swarmSpace + i * swarmSpace);

            let xScale = d3.scaleOrdinal().domain(years).range(xCoords);

            let yScaleBoys = d3.scaleLinear()
                .domain(d3.extent(filtered_boys.map(d => d.count)))
                .range([height, 0]);
            let yScaleGirls = d3.scaleLinear()
                .domain(d3.extent(filtered_girls.map(d => d.count)))
                .range([height-10, 0]);

            let sizeScaleBoys = d3.scaleSqrt()
                .domain(d3.extent(filtered_boys.map(d => d.name.length)))
                .range([16,10]);
            let sizeScaleGirls = d3.scaleSqrt()
                .domain(d3.extent(filtered_girls.map(d => d.name.length)))
                .range([16,10]);
            
            let color_boys = d3.scaleOrdinal().domain(boysNames).range(d3.schemeSpectral[10]);
            let color_girls = d3.scaleOrdinal().domain(girlsNames).range(d3.schemeSet3);

            //////

            linksBoys_array = [];
            for (let i = 0; i < filtered_boys.length; i++) {
                var next = filtered_boys.slice(i+1).findIndex(d=>d.name === filtered_boys[i].name);
                var next_link;
                if (next !== -1) {
                        next_link = next + i + 1;
                }
                else
                {
                    next_link = 0;
                }
                linksBoys_array.push({"name":filtered_boys[i].name,
                    "parent_index":i,
                    "next_index":next_link
                });
            }
            linksBoys_names = linksBoys_array.filter(d => d.next_index > 0)


            linksGirls_array = [];
            for (let i = 0; i < filtered_girls.length; i++) {
                var next = filtered_girls.slice(i+1).findIndex(d=>d.name === filtered_girls[i].name);
                var next_link;
                if (next !== -1) {
                        next_link = next + i + 1;
                }
                else
                {
                    next_link = 0;
                }
                linksGirls_array.push({"name":filtered_girls[i].name,
                    "parent_index":i,
                    "next_index":next_link
                });
            }
            linksGirls_names = linksGirls_array.filter(d => d.next_index > 0)

            
            /// X-Axis
            svg.append("g")
            .attr("id", 'xaxis')
            .attr("transform", "translate(0," + (height + margin.top + 10) + ")")
            .call(d3.axisBottom(xScale).tickSizeOuter(0)
            .tickSizeInner(0))
            .call(g => g.select(".domain").remove());

            /// Draw
            addSwarmCircles(filtered_boys, color_boys, xScale, yScaleBoys, radius, sizeScaleBoys,linksBoys_names);
            addSwarmCirclesGirls(filtered_girls, color_girls, xScale, yScaleGirls, radius, sizeScaleGirls,linksGirls_names);

            addSimulation(filtered_boys, xScale, yScaleBoys, radius);
            addSimulationGirls(filtered_girls, xScale, yScaleGirls, radius);

            function changeSartDate() {
                console.log(parseInt(this.value)+1)

                filtered_boys = boySet
                    .filter(d => d.year > parseInt(this.value) - 1)
                    .filter(d => d.name.toUpperCase())
                filtered_boys.sort((a,b) => a.year - b.year)

                filtered_girls = girlSet
                    .filter(d => d.year > parseInt(this.value) - 1)
                    .filter(d => d.name.toUpperCase())
                filtered_girls.sort((a,b) => a.year - b.year)

                let years = Array.from(new Set(filtered_boys.map(d => d.year)));

                let boysNames = Array.from(new Set(filtered_boys.map(d => d.name)));
                let girlsNames = Array.from(new Set(filtered_girls.map(d => d.name)));

                let xCoords = years.map((d, i) => swarmSpace + i * swarmSpace);
                let xScale = d3.scaleOrdinal().domain(years).range(xCoords);

                let yScaleBoys = d3.scaleLinear()
                    .domain(d3.extent(filtered_boys.map(d => d.count)))
                    .range([height, 0]);
                let yScaleGirls = d3.scaleLinear()
                    .domain(d3.extent(filtered_girls.map(d => d.count)))
                    .range([height-10, 0]);

                let sizeScaleBoys = d3.scaleSqrt()
                    .domain(d3.extent(filtered_boys.map(d => d.name.length)))
                    .range([16,10]);
                let sizeScaleGirls = d3.scaleSqrt()
                    .domain(d3.extent(filtered_girls.map(d => d.name.length)))
                    .range([16,10]);

                let color_boys = d3.scaleOrdinal().domain(boysNames).range(d3.schemeSpectral[10]);
                let color_girls = d3.scaleOrdinal().domain(girlsNames).range(d3.schemeSpectral[10]);

                linksBoys_array = [];
                for (let i = 0; i < filtered_boys.length; i++) {
                    var next = filtered_boys.slice(i+1).findIndex(d=>d.name === filtered_boys[i].name);
                    var next_link;
                    if (next !== -1) {
                            next_link = next + i + 1;
                    }
                    else
                    {
                        next_link = 0;
                    }
                    linksBoys_array.push({"name":filtered_boys[i].name,
                        "parent_index":i,
                        "next_index":next_link
                    });
                }

                linksBoys_names = linksBoys_array.filter(d => d.next_index > 0)

                linksGirls_array = [];
                for (let i = 0; i < filtered_girls.length; i++) {
                    var next = filtered_girls.slice(i+1).findIndex(d=>d.name === filtered_girls[i].name);
                    var next_link;
                    if (next !== -1) {
                            next_link = next + i + 1;
                    }
                    else
                    {
                        next_link = 0;
                    }
                    linksGirls_array.push({"name":filtered_girls[i].name,
                        "parent_index":i,
                        "next_index":next_link
                    });
                }
                linksGirls_names = linksGirls_array.filter(d => d.next_index > 0)

                svg.selectAll("#labelBoys").remove()
                svg2.selectAll("#labelGirls").remove()
                svg.selectAll("#xaxis").remove()
                svg.selectAll("#circleBoys").remove()
                svg2.selectAll("#circleGirls").remove()
                svg.append("g")
                .attr("id", 'xaxis')
                .attr("transform", "translate(0," + (height + margin.top + 10) + ")")
                .call(d3.axisBottom(xScale).tickSizeOuter(0)
                .tickSizeInner(0))
                .call(g => g.select(".domain").remove());

                
                addSwarmCircles(filtered_boys, color_boys, xScale, yScaleBoys, radius, sizeScaleBoys,linksBoys_names);
                addSimulation(filtered_boys, xScale, yScaleBoys, radius);
                addSwarmCirclesGirls(filtered_girls, color_girls, xScale, yScaleGirls, radius, sizeScaleGirls,linksGirls_names);
                addSimulationGirls(filtered_girls, xScale, yScaleGirls, radius);
              }
            d3.select("#startDate").on("input", changeSartDate)

        

        }
    }).catch( (error) => {
        console.log("Something went wrong", error);
    });


function addSwarmCircles(filtered, color, xScale, yScale, radius, sizeScale, links_names) {



    svg.selectAll("#circleBoys")
        .data(filtered)
        .enter()
        .append("circle")
        .attr("id","circleBoys")
        // .attr("class", "Bcirc")
        .attr("stroke", "black")
        .attr("fill", d => color(d.name))
        .attr("r", radius)
        .attr("opacity",1)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.count))
        .on('mouseover', function (event,d) {
            d3.select(this).transition()
                 .duration(20)
                 .attr("opacity", 0.75);

            d3.select('#tooltip').transition()
                 .duration(20)
                 .style("opacity", 0.8);

            const[x, y] = d3.pointer(event);



            clicked_name = d.name
            filtered_by_name = links_names.filter(data => data.name === clicked_name)

            neww_positions = []
            for (let i = 0; i < filtered_by_name.length; i++) {
                    neww_positions.push({"position": [d3.selectAll('#circleBoys')._groups[0][filtered_by_name[i].next_index].cx.baseVal.value, d3.selectAll('#circleBoys')._groups[0][filtered_by_name[i].next_index].cy.baseVal.value],
                        "parentPosition": [d3.selectAll('#circleBoys')._groups[0][filtered_by_name[i].parent_index].cx.baseVal.value, d3.selectAll('#circleBoys')._groups[0][filtered_by_name[i].parent_index].cy.baseVal.value]
                })
                }
                        
            svg.selectAll("#LinksBoys").data(neww_positions)
                .enter().append("line")
                .style("stroke", "gray")
                .style("border-color", "green")
                .attr("id", "LinksBoys")
                .attr("class","liens")
                .attr("stroke-dasharray","5, 5")
                .attr("stroke-width","2px")
                .attr("x1", function(d) { return d.parentPosition[0] })
                .attr("y1", function(d) { return d.parentPosition[1] + radius/2})
                .attr("x2", function(d) { return d.position[0] })
                .attr("y2", function(d) {  return d.position[1] + radius/2})
            
            
            d3.selectAll("#LinksBoys").transition()
                .duration(20)
                .style("opacity", 1)
            
            
        })
        .on('mouseout', function (event, i) {
            d3.select(this).transition()
                 .duration(20)
                 .attr("opacity", 1);
            

            d3.selectAll("#LinksBoys").transition()
                 .duration(20)
                 .style("opacity", 1)
            d3.selectAll("#LinksBoys").remove();
        })

        function titleCase(string){
            return string[0].toUpperCase() + string.slice(1).toLowerCase();
          }

        svg.selectAll("#labelBoys")
        .data(filtered)
        .enter()
        .append("text")
        .attr("id","labelBoys")
        .style("font-size", d => sizeScale(d.name.length))
        .style("font-family", 'Pacifico')
        .attr("x", (d => xScale(d.year)))
        .attr("y", d => yScale(d.count))
        .text(d => titleCase(d.name))

}


function addSimulation(filtered, xScale, yScale, radius) {
    let simulation = d3.forceSimulation(filtered)
        .force("x", d3.forceX(d => {
            return xScale(d.year);
        }).strength(0.2))
        .force("y", d3.forceY(d => {
            return yScale(d.count);
        }).strength(1))
        // .force("collide", d3.forceCollide(d => {
        //     return size(Math.sqrt(d.capitalisation));
        // }))
        .force("collide", d3.forceCollide(radius + 2))
        .alphaDecay(0)
        .alpha(0.3)
        .on("tick", tick)
        

    setTimeout(function () {
        simulation.alphaDecay(0.1);
    }, 3000);
}


function tick() {
    d3.selectAll("#circleBoys")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    d3.selectAll("#labelBoys")
        .attr("x", d => d.x - (side/2))
        .attr("y", d => d.y);
}


function addSwarmCirclesGirls(filtered, color, xScale, yScale, radius, sizeScale, links_names) {


    svg2.selectAll("#circleGirls")
        .data(filtered)
        .enter()
        .append("circle")
        .attr("id","circleGirls")
        // .attr("class", "Bcirc")
        .attr("stroke", "black")
        .attr("fill", d => color(d.name))
        .attr("r", radius)
        .attr("opacity",1)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.count))
        .on('mouseover', function (event,d) {
            d3.select(this).transition()
                 .duration(20)
                 .attr("opacity", 0.75);

            d3.select('#tooltip').transition()
                 .duration(20)
                 .style("opacity", 0.8);

            const[x, y] = d3.pointer(event);


            clicked_name = d.name
            filtered_by_name = links_names.filter(data => data.name === clicked_name)

            neww_positions = []
            for (let i = 0; i < filtered_by_name.length; i++) {
                    neww_positions.push({"position": [d3.selectAll('#circleGirls')._groups[0][filtered_by_name[i].next_index].cx.baseVal.value, d3.selectAll('#circleGirls')._groups[0][filtered_by_name[i].next_index].cy.baseVal.value],
                        "parentPosition": [d3.selectAll('#circleGirls')._groups[0][filtered_by_name[i].parent_index].cx.baseVal.value, d3.selectAll('#circleGirls')._groups[0][filtered_by_name[i].parent_index].cy.baseVal.value]
                })
                }
                        
            svg2.selectAll("#LinksGirls").data(neww_positions)
                .enter().append("line")
                .style("stroke", "gray")
                .style("border-color", "green")
                .attr("id", "LinksGirls")
                .attr("class","liens")
                .attr("stroke-dasharray","5, 5")
                .attr("stroke-width","2px")
                .attr("x1", function(d) { return d.parentPosition[0] })
                .attr("y1", function(d) { return d.parentPosition[1] + radius/2})
                .attr("x2", function(d) { return d.position[0] })
                .attr("y2", function(d) {  return d.position[1] + radius/2})
            
            
            d3.selectAll("#LinksGirls").transition()
                .duration(20)
                .style("opacity", 1)
            
            
        })
        .on('mouseout', function (event, i) {
            d3.select(this).transition()
                 .duration(20)
                 .attr("opacity", 1);

            d3.selectAll("#LinksGirls").transition()
                 .duration(20)
                 .style("opacity", 1)
            d3.selectAll("#LinksGirls").remove();
        })

        function titleCase(string){
            return string[0].toUpperCase() + string.slice(1).toLowerCase();
          }

        svg2.selectAll("#labelGirls")
        .data(filtered)
        .enter()
        .append("text")
        .attr("id","labelGirls")
        .style("font-size", d => sizeScale(d.name.length))
        .style("font-family", 'Pacifico')
        .attr("x", (d => xScale(d.year)))
        .attr("y", d => yScale(d.count))
        .text(d => titleCase(d.name))

}


function addSimulationGirls(filtered, xScale, yScale, radius) {
    let simulation = d3.forceSimulation(filtered)
        .force("x", d3.forceX(d => {
            return xScale(d.year);
        }).strength(0.2))
        .force("y", d3.forceY(d => {
            return yScale(d.count);
        }).strength(1))
        // .force("collide", d3.forceCollide(d => {
        //     return size(Math.sqrt(d.capitalisation));
        // }))
        .force("collide", d3.forceCollide(radius + 2))
        .alphaDecay(0)
        .alpha(0.3)
        .on("tick", tickGirls)
        

    setTimeout(function () {
        simulation.alphaDecay(0.1);
    }, 3000);
}


function tickGirls() {
    d3.selectAll("#circleGirls")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    d3.selectAll("#labelGirls")
        .attr("x", d => d.x - (side/2))
        .attr("y", d => d.y);
}