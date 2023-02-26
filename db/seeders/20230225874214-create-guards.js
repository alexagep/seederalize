export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Guards",
      [
        {
          id: "bfe8333d-aa0d-46e8-bce6-27bbfb4a6bf7",
          profile: "{}",
          created_at: "2023-02-25T13:34:05.673Z",
          updated_at: "2023-02-25T13:34:05.673Z",
          username: "Np4CwVKTd0",
          password:
            "$2a$12$YD8136cKDBQ86tc5Lasi8uH6nWMEKDDuwiXomWR5n4Ul687PTOWdm",
          role: "guard",
        },
        {
          id: "0ed58a57-5a03-4e26-b5b1-4c1df29c120a",
          profile: "{}",
          created_at: "2023-02-25T13:34:06.022Z",
          updated_at: "2023-02-25T13:34:06.022Z",
          username: "C41fUwJDKV",
          password:
            "$2a$12$cjAVji30pe8lRYr6KmvQruU85yZgaCw5jgQcGZuEgr0Bu/JrR.DFK",
          role: "admin",
        },
        {
          id: "f36471e4-d70a-4ff2-b440-82e5774fa66a",
          profile: "{}",
          created_at: "2023-02-25T13:34:06.302Z",
          updated_at: "2023-02-25T13:34:06.302Z",
          username: "wzGNcIn6UK",
          password:
            "$2a$12$RpkRK8tcOanR927tIV2bh..AmswBMPHK6uZTV3qldQWWTU7Kf88ky",
          role: "developer",
        },
        {
          id: "bc6b3979-a723-449b-97e3-0699b1306e94",
          profile: "{}",
          created_at: "2023-02-25T13:34:06.602Z",
          updated_at: "2023-02-25T13:34:06.602Z",
          username: "cy6VPbK0aY",
          password:
            "$2a$12$5ljamz332p86mK04n0gZjuvPsWxeRuWTyg3vXF5Fnvsf3GuGThWhq",
          role: "hr",
        },
        {
          id: "7fc04e09-00d6-482c-85d4-3d24cacc6f7b",
          profile: "{}",
          created_at: "2023-02-25T13:34:06.909Z",
          updated_at: "2023-02-25T13:34:06.909Z",
          username: "MpYi6JtiQM",
          password:
            "$2a$12$hVwqxpmfOye/MexXHGMxcuftsb3t1a2tVeDKRRFKzpK9xSD/4oZ0m",
          role: "guard",
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Guards", null, {});
  },
};
