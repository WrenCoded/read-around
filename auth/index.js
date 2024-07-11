import {Strategy, ExtractJwt} from "passport-jwt";


function setupJWTStrategy(passport){
  passport.use(
    new Strategy(
      {
        //get JWT from the Bearer token header in request
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        //use this secret key to decrypt the token
        secretOrKey: process.env.SECRET_KEY
      },
      function (payload, done) {
        try {
          //If the user object exists in the payload return it to passport using done
          return done(null, payload);
        } catch (e) {
          //If the user object exists in the p
          return done(e, null);
        }
      }
    )
  );
}
export { setupJWTStrategy };