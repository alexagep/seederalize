export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Guards",
      [
        {
          id: "641e38ae-0dca-449f-8d60-d095ad02ae91",
          profile: "{}",
          created_at: "2023-02-27T11:11:00.968Z",
          updated_at: "2023-02-27T11:11:00.968Z",
          username: "ZsYhjW59SO",
          password:
            "$2a$12$Ve4FRDQ1YDPYBmRIDNnLk.PgM2ixA5xd57gmll0w5KpRHpL1e3VVO",
          role: "maintainer",
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Guards", null, {});
  },
};
