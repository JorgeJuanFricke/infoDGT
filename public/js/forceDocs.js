

const ListaRecursosIds = function(ids) {
 
  var base_url = base_url = window.location.origin;
  let url = base_url + '/recurso/lista'
  let method = 'POST';
  var json = JSON.stringify({lista: ids});
  fetch(url, {
    method: method,
    body: json,
    headers: {
        'Content-Type': 'application/json'
    }
  })  
     
  .then(res => {
          
      if ( res.status !== 200) {
      
          throw new Error(res.message);
      }
      return res.json();
      
  })
  .then(resultado => {
    return resultado
  }).catch(error => alert(error));

};




const getSimsDocs = function(RecursoId) {
 
      // GET VECTOR ID
      
    // buscar semejantes obtener nodes y links
    //const nodes = [{node: 'A', value: 79}],
    //const links = [ {source: 4, target: 8, value: 2},]
    var base_url = 'http://localhost:8000';
    let url = base_url + '/docsims/' + RecursoId;
    let method = 'GET';
   
    fetch(url, {
      method: method,
      headers: {

      }
    })  
       
    .then(res => {
            
        if ( res.status !== 200) {
        
            throw new Error(res.message);
        }
        return res.json();
        
    })
    .then(resultado => {
    
        docs = resultado.rank
        recurso = docs.shift()[0];  
        let links = docs.map(function(doc) {
            return {s:recurso, d:doc[0], l:doc[1]}
        })
        let ids = docs.map(function(doc) {
            return doc[0]
        })

        nodes = ListaRecursosIds(ids)
        forceDocs(nodes, links);
    
    }).catch(error => alert(error));

};



    function forceDocs(nodes, links) {
        const width = 800;
        const height = 600;
        const margin = 100;
    
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const radius = d3.scaleLinear().range([10,50]);

        color.domain([0,nodes.length]);
        radius.domain(d3.extent(nodes, d => d.value));

        const svg = d3.select(".svg").append("svg").attr("width",width).attr("height",height);
        const chart = svg.append("g").attr("transform", `translate(${[margin/2 + width/2,margin/2 + height/2]})`);

        const sim = d3.forceSimulation(nodes).stop(); // initially stopped
        sim.on("tick", ticked);
    



    // Move nodes to fixed positions
    const nodeDragged = d3.drag().on('drag', function(d) {
        d.x = d3.event.x;
        d.y = d3.event.y;
        sim.stop()
        if(sim.alpha() < sim.alphaMin()) {
            sim.alpha(sim.alpha() * 100);
            sim.restart();
        }
        sim.tick();
        ticked();
    });

    const forceMap = new Map();

    setupPanel();
    init();

    function updateForces() {
        const str =  d3.select("#inout").node().value;
        const cx  = +d3.select("#cx").node().value * width/2;
        const cy  = +d3.select("#cy").node().value * height/2;
        const x   = +d3.select("#x").node().value * width/2;
        const y   = +d3.select("#y").node().value * width/2;

        sim.force("manybody", forceMap.get("manybody") ? d3.forceManyBody().strength(str) : null);
        sim.force("center", forceMap.get("center") ? d3.forceCenter(cx,cy) : null);
        sim.force("x", forceMap.get("x") ? d3.forceX().x(x) : null);
        sim.force("y", forceMap.get("y") ? d3.forceY().y(y) : null);
        sim.force("link", forceMap.get("link") ? d3.forceLink(links) : null);
        sim.force("collide", forceMap.get("collide") ? d3.forceCollide(d => radius(d.value)) : null);
    }

    function setupPanel() {
        d3.select('#ck_manybody').on('change', function() { return forceMap.set("manybody", this.checked) });
        d3.select('#ck_center').on('change', function() { return forceMap.set("center", this.checked) });
        d3.select('#ck_x').on('change', function() { return forceMap.set("x", this.checked) });
        d3.select('#ck_y').on('change', function() { return forceMap.set("y", this.checked) });
        d3.select('#ck_link').on('change', function() { return forceMap.set("link", this.checked) });
        d3.select('#ck_collide').on('change', function() { return forceMap.set("collide", this.checked) });

        d3.select('#show_lines').on('change', function() {
            this.checked ? d3.selectAll("line").style("opacity",1) : d3.selectAll("line").style("opacity",0) ;
        });

        d3.select('#tick').on('click', clickedTick);
        d3.select('#stop').on('click', stop);
        d3.select('#restart').on('click', start);
        d3.select("#reset").on('click', reset);

        d3.select('#c_alpha').on('input', function(d,i,n) {
            sim.alpha(+this.value/1000);
            d3.select('#alpha').text(sim.alpha())
                    .style('color', sim.alpha() < sim.alphaMin() ? 'red' : 'black')
        });
        d3.select('#c_alphaDecay').on('input', function(d,i,n) {
            sim.alphaDecay(+this.value/1000);
            d3.select('#alphaDecay').text(sim.alphaDecay());
        });
        d3.select('#c_alphaTarget').on('input', function(d,i,n) {
            sim.alphaTarget(+this.value/1000);
            d3.select('#alphaTarget').text(sim.alphaTarget());
        });
        d3.select('#c_alphaMin').on('input', function(d,i,n) {
            sim.alphaMin(+this.value/1000);
            d3.select('#alphaMin').text(sim.alphaMin());
        });
        d3.select('#c_velocityDecay').on('input', function(d,i,n) {
            sim.velocityDecay(+this.value/1000);
            d3.select('#velocityDecay').text(sim.velocityDecay());
        });
    }

    function clickedTick() {
        sim.tick();
        ticked();
    }

    function ticked() {
        updateForces();
        redraw();
        d3.select('#alpha')
                .style('color', sim.alpha() < sim.alphaMin() ? 'red' : 'black')
                .text(sim.alpha());
        d3.select('#alphaMin')
                .text(sim.alphaMin());
        d3.select('#alphaTarget')
                .text(sim.alphaTarget());
        d3.select('#alphaDecay')
                .text(sim.alphaDecay());
        d3.select('#velocityDecay')
                .text(sim.velocityDecay());
        d3.select('#c_alpha').node().value  = sim.alpha() * 1000;
    }

    function start() {
        d3.select('#restart').property('disabled', true);
        d3.select('#stop').property('disabled', false);
        d3.select('#tick').property('disabled', true);
        if (sim.alpha() < sim.alphaMin()) {
            sim.alpha(1);
        }
        sim.restart();
    }

    function stop() {
        sim.stop();
        d3.select('#restart').property('disabled', false);
        d3.select('#stop').property('disabled', true);
        d3.select('#tick').property('disabled', false);
    }

    function reset() {
        location.reload();
    }

    function init() {
        forceMap.set("center", null);
        forceMap.set("manybody", null);
        forceMap.set("collide", null);
        forceMap.set("x", null);
        forceMap.set("y", null);
        forceMap.set('radius', null);
        forceMap.set("link", null);

        d3.select('#alpha').text(sim.alpha());
        d3.select('#alphaMin').text(sim.alphaMin());
        d3.select('#alphaTarget').text(sim.alphaTarget());
        d3.select('#alphaDecay').text(sim.alphaDecay());
        d3.select('#velocityDecay').text(sim.velocityDecay());

        d3.select('#restart').property('disabled', false);
        d3.select('#stop').property('disabled', true);
        d3.select('#tick').property('disabled', false);

        chart.selectAll('line')
                .data(links).enter()
                .append('line')
                .attr("x1", d => d.source.x)
                .attr("x2", d => d.target.x)
                .attr("y1", d => d.source.y)
                .attr("y2", d => d.target.y)
                .style("fill", 'none')
                .style("stroke", 'black')
                .style("stroke-width", d => d.value * d.value)

        const n = chart.selectAll('g.node')
                .data(nodes).enter()
                .append("g").attr("class", 'node')
                .attr("transform", d => `translate(${[d.x, d.y]})`)
                .call(nodeDragged);

        n.append("circle")
                .attr("r", d => radius(d.value))
                .style("fill", (d,i) => color(i))
                .style("stroke", 'black')

        n.append("text")
                .text(d => d.node)
                .style("font-size", d => radius(d.value))
                .style("fill", (d,i) => contrast(color(i)))
    }

    function redraw() {
        chart.selectAll('g.node')
                .attr("transform", d => `translate(${[d.x, d.y]})`);

        chart.selectAll('line')
                .attr("x1", d => d.source.x)
                .attr("x2", d => d.target.x)
                .attr("y1", d => d.source.y)
                .attr("y2", d => d.target.y)
    }

    function contrast(color) {
        const c = d3.rgb(color);
        return (c.r * 0.299 + c.g * 0.587 + c.b * 0.114) > 150 ? 'black' : 'white';
    }
 }
