const dynamicImportMap = {
  "imports": {
    "joi": "https://cdn.jsdelivr.net/npm/joi@18.0.1/+esm",
    //"my-module/": "/path/to/my-module/"
  }
};

const importmapScript = document.createElement("script");
importmapScript.type = "importmap";
importmapScript.textContent = JSON.stringify(dynamicImportMap);

// Append the import map to the head or before other module scripts
document.head.appendChild(importmapScript);

console.log("yo");

// Now, subsequent module scripts can use the defined imports
// For example:
// <script type="module">
//   import moment from 'moment';
//   console.log(moment().format());
// </script>