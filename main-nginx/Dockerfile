#FROM ubuntu:16.04
#MAINTAINER MCP
#RUN apt-get update
#RUN apt-get install -y nano wget dialog net-tools
#RUN apt-get install -y nginx  

FROM nginx:1.13.5
MAINTAINER Chendra


RUN rm -v /etc/nginx/nginx.conf
ADD nginx.conf /etc/nginx/
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
EXPOSE 80
CMD service nginx start