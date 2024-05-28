module.exports = (sequelize, DataTypes) => {
  const FlightSearch = sequelize.define("FlightSearch", {
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tickets: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      set(tickets) {
        this.setDataValue(
          "tickets",
          tickets.map((ticket) => ({
            ...ticket,
            adults: ticket.adults || 0,
            children: ticket.children || 0,
            infants: ticket.infants || 0,
          }))
        );
      },
      get() {
        const tickets = this.getDataValue("tickets");
        return tickets.map((ticket) => ({
          ...ticket,
          adults: ticket.adults,
          children: ticket.children,
          infants: ticket.infants,
        }));
      },
    },
  });

  return FlightSearch;
};
