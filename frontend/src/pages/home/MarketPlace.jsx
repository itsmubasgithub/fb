import React, { useState } from "react";
import Header from "../../components/home/Header";
import { Col, Modal, Row } from "react-bootstrap";
import SideBar from "../../components/home/SideBar";
import Items from "./Items";
import { Button } from "@mui/material";
import axios from "axios";

const MarketPlace = () => {
  const items = [
    {
      id: 1,
      price: 326,
      title: "2011 Volkswagen Polo",
      location: "Northampton",
      mileage: "89,000 km",
      transmission: "Manual",
      exteriorColor: "Grey",
      interiorColor: "Black",
      fuelType: "Petrol",
      imageUrl:
        "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg", // Replace with actual image URL
    },
    {
      id: 2,
      price: 4563,
      title: "Carrera Vengeance 27.5inch Bike",
      location: "Coventry",
      mileage: "N/A",
      transmission: "N/A",
      exteriorColor: "Black",
      interiorColor: "N/A",
      fuelType: "N/A",
      imageUrl:
        "https://thumbs.dreamstime.com/b/bmw-f-series-gt-berlin-germany-august-modern-red-car-city-street-57323205.jpg", // Replace with actual image URL
    },
    {
      id: 3,
      price: 32371,
      title: "iPhone 16 Pro 128GB (Desert Titanium)",
      location: "Burton upon Trent",
      mileage: "N/A",
      transmission: "N/A",
      exteriorColor: "Titanium",
      interiorColor: "N/A",
      fuelType: "N/A",
      imageUrl:
        "https://static.vecteezy.com/system/resources/thumbnails/023/192/562/small_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg", // Replace with actual image URL
    },
    {
      id: 4,
      price: 21871,
      title: "2015 BMW 3 Series",
      location: "Leicester",
      mileage: "75,000 km",
      transmission: "Automatic",
      exteriorColor: "White",
      interiorColor: "Beige",
      fuelType: "Diesel",
      imageUrl:
        "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?cs=srgb&dl=pexels-mikebirdy-120049.jpg&fm=jpg", // Replace with actual image URL
    },
    {
      id: 5,
      price: 288712,
      title: "Gaming PC (RTX 3080, i9 Processor)",
      location: "Nottingham",
      mileage: "N/A",
      transmission: "N/A",
      exteriorColor: "Black",
      interiorColor: "N/A",
      fuelType: "N/A",
      imageUrl:
        "https://media.istockphoto.com/id/477884556/photo/bmw-i8-vision-efficient-dynamics-hybrid-car.jpg?s=612x612&w=0&k=20&c=q9XjbrFrAdE8f3Hz3Iw2YiMNIxLiQZk3hwP6PZpePbI=", // Replace with actual image URL
    },
    {
      id: 6,
      price: 28971,
      title: "Set of Dining Chairs (4 pcs)",
      location: "Derby",
      mileage: "N/A",
      transmission: "N/A",
      exteriorColor: "Brown",
      interiorColor: "N/A",
      fuelType: "N/A",
      imageUrl:
        "https://media.istockphoto.com/id/499088252/photo/bmw-i8-hybrid.jpg?s=612x612&w=0&k=20&c=L8HUvUuJjC_R1y64lU1EYVVvm_nJk6YejQRsPQlxyTw=", // Replace with actual image URL
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleCheckOut = async (item) => {
    const response = await axios.post(
      "http://localhost:3001/api/payment/checkout",
      {
        name: item.title,
        price: item.price,
        imageUrl: item.imageUrl,
      }
    );
    window.location.assign(response.data.url);
  };

  return (
    <>
      <Header />
      <Row>
        {/* Sidebar */}
        <Col xl={2} lg={2} md={0} className="d-none d-lg-block">
          <SideBar />
        </Col>

        {/* Main Content */}
        <Col xl={10} lg={10} md={12} className="p-md-5 p-sm-2 p-xl-4 p-4">
          <Items />
          <div className="container my-4">
            <h3 className="mb-4">Today's Picks</h3>
            <div className="row">
              {items.map((item) => (
                <div className="col-md-4" key={item.id}>
                  <div
                    className="card mb-4"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleShowModal(item)}
                  >
                    <img
                      src={item.imageUrl}
                      className="card-img-top"
                      alt={item.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.price}</h5>
                      <p className="card-text">{item.title}</p>
                      <p className="card-text text-muted">{item.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for displaying details */}
            {selectedItem && (
              <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedItem.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="img-fluid mb-3"
                  />
                  <Row>
                    <Col xs={6}>
                      <p>
                        <strong>Price:</strong> {selectedItem.price}
                      </p>
                      <p>
                        <strong>Location:</strong> {selectedItem.location}
                      </p>
                      <p>
                        <strong>Mileage:</strong> {selectedItem.mileage}
                      </p>
                    </Col>
                    <Col xs={6}>
                      <p>
                        <strong>Transmission:</strong>{" "}
                        {selectedItem.transmission}
                      </p>
                      <p>
                        <strong>Exterior Color:</strong>{" "}
                        {selectedItem.exteriorColor}
                      </p>
                      <p>
                        <strong>Interior Color:</strong>{" "}
                        {selectedItem.interiorColor}
                      </p>
                      <p>
                        <strong>Fuel Type:</strong> {selectedItem.fuelType}
                      </p>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <div className="d-flex align-items-center gap-3">
                    <Button
                      variant="contained"
                      className="bg-info rounded-3 text-white fw-bold"
                      onClick={handleCloseModal}
                    >
                      Close
                    </Button>
                    <Button
                      onClick={() => handleCheckOut(selectedItem)}
                      variant="contained"
                      className="bg-warning rounded-3 text-white fw-bold"
                    >
                      BUY NOW
                    </Button>
                  </div>
                </Modal.Footer>
              </Modal>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default MarketPlace;
