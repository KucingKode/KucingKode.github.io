import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {
    certificates: [
      // [title, year, link]
      [
        'Freecodecamp Responsive Web Design Certification',
        '2021',
        'https://www.freecodecamp.org/certification/fazle/responsive-web-design'
      ],
      [
        'Freecodecamp JavaScript Algorithms and Data Structures Certification',
        '2021',
        'https://www.freecodecamp.org/certification/fazle/javascript-algorithms-and-data-structures'
      ],
      [
        'Freecodecamp Front End Development Libraries Certification',
        '2021',
        'https://www.freecodecamp.org/certification/fazle/front-end-development-libraries'
      ],
      [
        'Freecodecamp Data Visualization Certification',
        '2021',
        'https://www.freecodecamp.org/certification/fazle/data-visualization'
      ],
      [
        'Freecodecamp Back End Development and APIs Certification',
        '2021',
        'https://www.freecodecamp.org/certification/fazle/back-end-development-and-apis'
      ]
    ],

    projects: [
      // [title, link, image]
      [
        'Freecodecamp: Choropleth Map',
        'https://kucingkode.github.io/FCC-Data-Visualization/end/choropleth-map.html',
        '/assets/choropleth.png'
      ],
      [
        'Freecodecamp: Heat Map',
        'https://kucingkode.github.io/FCC-Data-Visualization/end/heat-map.html',
        '/assets/heat.png'
      ],
      [
        'Freecodecamp: Treemap Diagram',
        'https://kucingkode.github.io/FCC-Data-Visualization/end/treemap-diagram.html',
        '/assets/treemap.png'
      ],
      [
        'Freecodecamp: Scatterplot Graph',
        'https://kucingkode.github.io/FCC-Data-Visualization/end/scatterplot-graph.html',
        '/assets/scatter.png'
      ],
      [
        'Freecodecamp: Bar Chart',
        'https://kucingkode.github.io/FCC-Data-Visualization/end/bar-chart.html',
        '/assets/bar.png'
      ],
      [
        'Freecodecamp Project: 25 + 5 Clock',
        'https://codepen.io/CatKode/full/LYygvaN',
        'https://assets.codepen.io/6644886/internal/screenshots/pens/LYygvaN.default.png?fit=cover&format=auto&ha=true&height=540&quality=75&v=2&version=1628392202&width=960'
      ],
      [
        'Freecodecamp Project: Calculator',
        'https://codepen.io/CatKode/full/MWmPvjq',
        'https://assets.codepen.io/6644886/internal/screenshots/pens/MWmPvjq.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1628300574&width=960'
      ],
      [
        'Freecodecamp: Drum Machine',
        'https://codepen.io/CatKode/full/OJmBWaX',
        'https://assets.codepen.io/6644886/internal/screenshots/pens/OJmBWaX.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1628223430&width=960'
      ],
      [
        'Freecodecamp: Markdown Previewer',
        'https://codepen.io/CatKode/full/xxdawwy',
        'https://assets.codepen.io/6644886/internal/screenshots/pens/xxdawwy.default.png?fit=cover&format=auto&ha=true&height=540&quality=75&v=2&version=1628146276&width=960'
      ],
      [
        'Freecodecamp: Survey Form',
        'https://codepen.io/CatKode/full/poPaoXE',
        'https://assets.codepen.io/6644886/internal/screenshots/pens/poPaoXE.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1627361756&width=960'
      ],
      [
        'Freecodecamp: Quote Generator',
        'https://codepen.io/CatKode/full/KKmxPvV',
        'https://assets.codepen.io/6644886/internal/screenshots/pens/KKmxPvV.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1628062841&width=960'
      ],
      [
        'Freecodecamp: Tribute Page',
        'https://codepen.io/CatKode/full/Exmobmm',
        'https://assets.codepen.io/6644886/internal/screenshots/pens/Exmobmm.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1627285991&width=960'
      ],
      [
        'Freecodecamp: Product Landing Page',
        'https://codepen.io/CatKode/full/wvdyMBB',
        'https://assets.codepen.io/6644886/internal/screenshots/pens/wvdyMBB.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1627447215&width=960'
      ],
      [
        'Freecodecamp: Technical Documentation Page',
        'https://codepen.io/CatKode/details/mdmxBOe',
        'https://assets.codepen.io/6644886/internal/screenshots/pens/mdmxBOe.default.png?fit=cover&format=auto&ha=true&height=540&quality=75&v=2&version=1627557943&width=960'
      ]
    ],

    mediaLinks: [
      // [media, link]
      ['Email', 'mailto:fazlecode@gmail.com'],
      ['Github', 'https://github.com/KucingKode'],
      ['Codepen', 'https://codepen.io/CatKode'],
      ['Codewars', 'https://www.codewars.com/users/fazle'],
      ['Freecodecamp', 'https://www.freecodecamp.org/fazle']
    ],
    builtByMe: [
      // [title, logo, link]
      ['Cithak', '/assets/cithak.svg', 'https://github.com/KucingKode/Cithak']
    ],
    pageSections: ['About', 'Projects', 'Find Me']
  }
})

export default app
