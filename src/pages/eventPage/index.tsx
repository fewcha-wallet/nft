import SectionImg from "components/eventComp/SectionImg";
import SectionText from "components/eventComp/SectionText";
import React from "react";

const EventPage: React.FC = () => {
  return (
    <section className="event--page  h-event-page pt-[120px]">
      <div className="container flex flex-col md:flex-row">
        <SectionImg className="w-full md:w-[40%] bg-[#ecf0f1] py-10 px-8 " />
        <SectionText className="w-full md:w-[60%] bg-[#4b4b4b]" />
      </div>
    </section>
  );
};

export default EventPage;
