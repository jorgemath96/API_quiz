const { json } = require("body-parser");

class Resume {
  constructor() { }

  data = [
    {
      "title": "Aritmética",
      "topic": [
        {
          "id": 1,
          "title": "Fundamentos",
          "subtopic": {
            1: "Números naturales",
            2: "Números enteros",
            3: "Números racionales"
          }
        },
        {
          "id": 2,
          "title": "Fracciones",
          "subtopic": {
            1: "Fracciones equivalentes",
            2: "Suma y resta de fracciones",
            3: "Multiplicación y división de fracciones"
          }
        },
        {
          "id": 3,
          "title": "Jerarquía de operaciones",
          "subtopic": {
            1: "Definición",
            2: "Operaciones combinadas"
          }
        }
      ]
    },
    {
      "title": "Álgebra",
      "topic": [
        {
          "id": 1,
          "title": "Fundamentos",
          "subtopic": {
            1: "Términos algebraicos",
            2: "Expresiones algebraicas",
            3: "Reducción de términos semejantes"
          }
        },
        {
          "id": 2,
          "title": "Productos notables",
          "subtopic": {
            1: "Cuadrado de un binomio",
            2:"Binomios conjugados",
            3:"Binomios con un término común"
          }
        },
        {
          "id": 3,
          "title": "Ecuaciones",
          "subtopic": {
            1: "Ecuaciones lineales",
            2: "Ecuaciones cuadráticas"
          }
        }
      ]
    },
    {
      "title": "Geometría",
      "topic": [
        {
          "id": 1,
          "title": "Nociones básicas",
          "subtopic": {
            1: "Puntos, rectas y planos",
            2: "Ángulos"
          }
        },
        {
          "id": 2,
          "title": "Triángulos",
          "subtopic": {
            1: "Clasificación",
            2: "Congruencia",
            3: "Teorema de Pitágoras"
          }
        },
        {
          "id": 3,
          "title": "Cuadriláteros",
          "subtopic": {
            1: "Clasificación",
            2: "Paralelogramos",
            3: "Trapecios"
          }
        }
      ]
    },
    {
      "title": "Probabilidad",
      "topic": [
        {
          "id": 1,
          "title": "Fundamentos",
          "subtopic": {
            1: "Cojunntos",
            2: "Diagramas de Venn",
            3: "Conteo"
          }
        },
        {
          "id": 2,
          "title": "Probabilidad",
          "subtopic": {
            1: "Definición",
            2: "Probabilidad de un evento",
            3: "Probabilidad de un evento complementario",
            4: "Propiedades de la probabilidad"
          }
        }
      ]
    },
    {
      "title": "Estadística",
      "topic": [
        {
          "id": 1,
          "title": "Datos no agrupados",
          "subtopic": {
            1: "Medidas de tendencia central",
            2: "Medidas de dispersión"
          }
        },
        {
          "id": 2,
          "title": "Datos agrupados",
          "subtopic": {
            1: "Medidas de tendencia central",
            2: "Medidas de dispersión",
            3: "Gráficas de barras"
          }
        },
        {
          "id": 3,
          "title": "Distribuciones de probabilidad",
          "subtopic": {
            1: "Distribución exponencial",
            2: "Distribución normal"
          }
        }
      ]
    }
  ]

  getResume() {
    return this.data;
  }
}

module.exports = Resume;