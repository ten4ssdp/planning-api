define({ "api": [
  {
    "type": "post",
    "url": "/hotels",
    "title": "Add an hotel",
    "name": "AddHotel",
    "group": "Hotel",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip code of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Hotel row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Hotel row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "sectorId",
            "description": "<p>Hotel sector ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/hotel.ts",
    "groupTitle": "Hotel"
  },
  {
    "type": "delete",
    "url": "/hotels/:id",
    "title": "Delete an hotel",
    "name": "DeleteHotel",
    "group": "Hotel",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Hotel unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip code of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Hotel row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Hotel row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "sectorId",
            "description": "<p>Hotel sector ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/hotel.ts",
    "groupTitle": "Hotel"
  },
  {
    "type": "get",
    "url": "/hotels/:id",
    "title": "Request an hotel",
    "name": "GetHotel",
    "group": "Hotel",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Hotel unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip code of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Hotel row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Hotel row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "sectorId",
            "description": "<p>Hotel sector ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "visits",
            "description": "<p>Visits of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "visits.id",
            "description": "<p>ID of the visit.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "visits.rate",
            "description": "<p>Rate of the visit.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visits.createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visits.updatedAt",
            "description": "<p>Row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "sector",
            "description": "<p>ID of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "sector.id",
            "description": "<p>ID of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sector.name",
            "description": "<p>Name of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sector.createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sector.updatedAt",
            "description": "<p>Row update date.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/hotel.ts",
    "groupTitle": "Hotel"
  },
  {
    "type": "get",
    "url": "/hotels",
    "title": "Request all hotels",
    "name": "GetHotels",
    "group": "Hotel",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip code of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Hotel row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Hotel row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "sectorId",
            "description": "<p>Hotel sector ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "visits",
            "description": "<p>Visits of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "visits.id",
            "description": "<p>ID of the visit.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "visits.rate",
            "description": "<p>Rate of the visit.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visits.createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visits.updatedAt",
            "description": "<p>Row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "sector",
            "description": "<p>ID of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "sector.id",
            "description": "<p>ID of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sector.name",
            "description": "<p>Name of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sector.createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sector.updatedAt",
            "description": "<p>Row update date.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/hotel.ts",
    "groupTitle": "Hotel"
  },
  {
    "type": "put",
    "url": "/hotels/:id",
    "title": "Update an hotel",
    "name": "UpdateHotel",
    "group": "Hotel",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Hotel unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip code of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Hotel row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Hotel row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "sectorId",
            "description": "<p>Hotel sector ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/hotel.ts",
    "groupTitle": "Hotel"
  },
  {
    "type": "post",
    "url": "/parkings",
    "title": "Add a parking",
    "name": "AddParking",
    "group": "Parking",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip code of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Parking row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Parking row update date.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/parking.ts",
    "groupTitle": "Parking"
  },
  {
    "type": "delete",
    "url": "/parkings/:id",
    "title": "Delete a parking",
    "name": "DeleteParking",
    "group": "Parking",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Parking unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip code of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Parking row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Parking row update date.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/parking.ts",
    "groupTitle": "Parking"
  },
  {
    "type": "get",
    "url": "/parkings/:id",
    "title": "Request a parking",
    "name": "GetParking",
    "group": "Parking",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Parking unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip code of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Parking row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Parking row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "vehicles",
            "description": "<p>Vehicle of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vehicle.id",
            "description": "<p>ID of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vehicle.numberPlate",
            "description": "<p>NumberPlate of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vehicle.type",
            "description": "<p>Model of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vehicle.createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vehicle.updatedAt",
            "description": "<p>Row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vehicle.parkingId",
            "description": "<p>ID of the linked parking row.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vehicle.teamId",
            "description": "<p>ID of the linked team row.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/parking.ts",
    "groupTitle": "Parking"
  },
  {
    "type": "get",
    "url": "/parkings",
    "title": "Request all parkings",
    "name": "GetParkings",
    "group": "Parking",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip code of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Parking row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Parking row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "vehicles",
            "description": "<p>Vehicle of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vehicle.id",
            "description": "<p>ID of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vehicle.numberPlate",
            "description": "<p>NumberPlate of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vehicle.type",
            "description": "<p>Model of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vehicle.createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vehicle.updatedAt",
            "description": "<p>Row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vehicle.parkingId",
            "description": "<p>ID of the linked parking row.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vehicle.teamId",
            "description": "<p>ID of the linked team row.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/parking.ts",
    "groupTitle": "Parking"
  },
  {
    "type": "put",
    "url": "/parkings/:id",
    "title": "Update a parking",
    "name": "UpdateParking",
    "group": "Parking",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Parking unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip code of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Parking row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Parking row update date.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/parking.ts",
    "groupTitle": "Parking"
  },
  {
    "type": "post",
    "url": "/sectors",
    "title": "Add a sector",
    "name": "AddSector",
    "group": "Sector",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Row update date.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/sector.ts",
    "groupTitle": "Sector"
  },
  {
    "type": "delete",
    "url": "/sectors/:id",
    "title": "Delete a sector",
    "name": "DeleteSector",
    "group": "Sector",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Sector unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Row update date.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/sector.ts",
    "groupTitle": "Sector"
  },
  {
    "type": "get",
    "url": "/sectors/:id",
    "title": "Request a sector",
    "name": "GetSector",
    "group": "Sector",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Sector unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "teams",
            "description": "<p>Teams of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "hotels",
            "description": "<p>Hotels of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hotels.id",
            "description": "<p>ID of the Hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hotels.name",
            "description": "<p>Name of the Hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hotels.address",
            "description": "<p>Address of the Hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hotels.zipCode",
            "description": "<p>Zip code of the Hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hotels.city",
            "description": "<p>City of the Hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hotels.createdAt",
            "description": "<p>Hotel row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hotels.updatedAt",
            "description": "<p>Hotel row update date.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/sector.ts",
    "groupTitle": "Sector"
  },
  {
    "type": "get",
    "url": "/sectors",
    "title": "Request all sectors",
    "name": "GetSectors",
    "group": "Sector",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "teams",
            "description": "<p>Teams of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "hotels",
            "description": "<p>Hotels of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hotels.id",
            "description": "<p>ID of the Hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hotels.name",
            "description": "<p>Name of the Hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hotels.address",
            "description": "<p>Address of the Hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hotels.zipCode",
            "description": "<p>Zip code of the Hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hotels.city",
            "description": "<p>City of the Hotel.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hotels.createdAt",
            "description": "<p>Hotel row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hotels.updatedAt",
            "description": "<p>Hotel row update date.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/sector.ts",
    "groupTitle": "Sector"
  },
  {
    "type": "put",
    "url": "/sectors/:id",
    "title": "Update a sector",
    "name": "UpdateSector",
    "group": "Sector",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Sector unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the sector.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Row update date.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/sector.ts",
    "groupTitle": "Sector"
  },
  {
    "type": "post",
    "url": "/vehicles",
    "title": "Add a vehicle",
    "name": "AddVehicle",
    "group": "Vehicle",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "numberPlate",
            "description": "<p>NumberPlate of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Model of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parkingId",
            "description": "<p>ID of the linked parking row.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "teamId",
            "description": "<p>ID of the linked team row.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/vehicle.ts",
    "groupTitle": "Vehicle"
  },
  {
    "type": "delete",
    "url": "/vehicles/:id",
    "title": "Delete a vehicle",
    "name": "DeleteVehicle",
    "group": "Vehicle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vehicle unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "numberPlate",
            "description": "<p>NumberPlate of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Model of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parkingId",
            "description": "<p>ID of the linked parking row.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "teamId",
            "description": "<p>ID of the linked team row.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/vehicle.ts",
    "groupTitle": "Vehicle"
  },
  {
    "type": "get",
    "url": "/vehicles/:id",
    "title": "Request a vehicle",
    "name": "GetVehicle",
    "group": "Vehicle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vehicle unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "numberPlate",
            "description": "<p>NumberPlate of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Model of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parkingId",
            "description": "<p>ID of the linked parking row.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "teamId",
            "description": "<p>ID of the linked team row.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "parking",
            "description": "<p>Parking information.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parking.id",
            "description": "<p>ID of the Parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parking.address",
            "description": "<p>Address of the Parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parking.zipCode",
            "description": "<p>Zip code of the Parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parking.city",
            "description": "<p>City of the Parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parking.createdAt",
            "description": "<p>Parking row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parking.updatedAt",
            "description": "<p>Parking row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "team",
            "description": "<p>Team information.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/vehicle.ts",
    "groupTitle": "Vehicle"
  },
  {
    "type": "get",
    "url": "/vehicles",
    "title": "Request all vehicles",
    "name": "GetVehicles",
    "group": "Vehicle",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "numberPlate",
            "description": "<p>NumberPlate of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Model of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parkingId",
            "description": "<p>ID of the linked parking row.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "teamId",
            "description": "<p>ID of the linked team row.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "parking",
            "description": "<p>Parking information.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parking.id",
            "description": "<p>ID of the Parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parking.address",
            "description": "<p>Address of the Parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parking.zipCode",
            "description": "<p>Zip code of the Parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parking.city",
            "description": "<p>City of the Parking.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parking.createdAt",
            "description": "<p>Parking row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parking.updatedAt",
            "description": "<p>Parking row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "team",
            "description": "<p>Team information.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/vehicle.ts",
    "groupTitle": "Vehicle"
  },
  {
    "type": "put",
    "url": "/vehicles/:id",
    "title": "Update a vehicle",
    "name": "UpdateVehicle",
    "group": "Vehicle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vehicle unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "numberPlate",
            "description": "<p>NumberPlate of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Model of the vehicle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Row creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Row update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parkingId",
            "description": "<p>ID of the linked parking row.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "teamId",
            "description": "<p>ID of the linked team row.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/vehicle.ts",
    "groupTitle": "Vehicle"
  }
] });
