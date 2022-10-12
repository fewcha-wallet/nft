import SectionImg from "components/eventComp/SectionImg";
import SectionText from "components/eventComp/SectionText";
import React from "react";

const EventPage: React.FC = () => {
  return (
    <section className="event--page">
      <div className="bg-event-page content-event-page container flex flex-col md:flex-row">
        <SectionImg className="w-full md:w-[40%] bg-[#ecf0f1] pt-[160px] px-8 " />
        <SectionText className="w-full md:w-[60%] bg-[#4b4b4b]" />
      </div>
    </section>
  );
};

export default EventPage;
