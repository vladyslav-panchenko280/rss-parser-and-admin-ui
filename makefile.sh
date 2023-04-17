# !/bin/bash

echo "Choose an option:"
echo "1. Installation"
echo "2. Build"
echo "3. Run locally"
echo "4. Start"
echo "5. Parse RSS feed and update"
read option

case $option in
    1)
        npm install

        cd ./client
        npm install
        ;;
    2)
        npm run build

        cd ./client
        npm run build
        ;;
    3)
        npm start &

        cd ./client
        npm run dev &
        ;;
    4)
       npm start &

       cd ./client
       npm run start
       ;;
    5)
     # Make API request using curl or any other suitable tool
        curl -X GET http://localhost:3010/api/rssParse
    ;;
    *)
        echo "Invalid option"
        ;;
esac
