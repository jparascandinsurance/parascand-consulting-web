# Static site served by Caddy.
# Works on Railway, Fly.io, Render, or any container host.
# Railway will auto-detect this Dockerfile and use it instead of Nixpacks.

FROM caddy:2-alpine

# Copy the site
WORKDIR /srv
COPY . /srv

# Railway provides $PORT at runtime; Caddyfile reads it.
# Override the default Caddyfile location.
ENV CADDY_CONFIG=/srv/Caddyfile

EXPOSE 8080

# Run Caddy with our Caddyfile
CMD ["caddy", "run", "--config", "/srv/Caddyfile", "--adapter", "caddyfile"]
