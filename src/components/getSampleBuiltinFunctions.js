"use client";
import { Card, CardHeader, CardBody, Typography } from "./providers.js";



const SBFunctions = () => {

  function getRandomInt (max) {
     return alert(Math.floor(Math.random() * parseInt(max)))
  }

  return (
    <>
      <Card className="overflow-scroll ">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Built In Functions
                </Typography>
            </div>
          </div>
        </CardHeader>
      
        <CardBody className="overflow-scroll px-0">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => getRandomInt(1000)}>Math Random</button>
        </CardBody>
      </Card>
   </>
  );
};

export { SBFunctions }




