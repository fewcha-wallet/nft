import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TextDes = styled.p`
  padding: 12px 0;
`;

const SectionText: React.FC<{ className?: string }> = ({ className }) => {

  return (
    <div className={`${className} text-white py-10 md:pt-6  px-8`}>
      <h1 className="text-[36px]">Lorem ipsum dolor sit amet</h1>
      <h3 className="text-[32px]">Lorem ipsum dolor!</h3>
      <TextDes>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem facilis
        ipsa nam consequuntur
      </TextDes>
      <TextDes>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
        laborum labore officia quas, provident velit saepe in maxime deleniti
        doloribus quos totam nihil accusantium culpa, similique natus?
        Laboriosam, provident fugiat.
      </TextDes>

    </div>
  );
};

export default SectionText;
