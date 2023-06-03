import { SQuery } from "../lib/squery/SQuery";

SQuery.auth({
  login: "account",
  //  extension: {
  //   login:[EmailConfirmartion],
  //   signup:[EmailConfirmartion]
  // },
  match: ["telephone", "password"],
  signup: "user",
});

SQuery.auth({
  login: "account",
  // extension: [EmailConfirmartion],
  match: ["telephone", "password"],
  signup: "manager",
});
