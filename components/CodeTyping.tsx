"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function CodeTyping() {
  const codeRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const typed = new Typed(codeRef.current, {
      strings: [
`import { Polycogni, usePolycogni } from "Polycogni";
import { useEffect } from "react";
import sample_contract from "sample_contract_abi";

function Child_Object {
  let { is_authorized, 
        wallet_address, 
        request_authorization, 
        call_contract, 
        register_callback } = usePolycogni();

  function login() {
    request_authorization();
  }

  function call_my_contract(
      description, 
      contract_address, 
      function_name, 
      parameters) {
    let abi = sample_contract.abi;
    call_contract(
      description, 
      contract_address, 
      abi, 
      function_name, 
      parameters);
  }

  useEffect(() => {
    register_callback("auth", (status) => {
      console.log("auth_callback", status);
    });

    register_callback("call", (status) => {
      console.log("call_callback", status);
    });
  }, []);

  return (
    { !is_authorized &&
      <button onClick={login}>
        Login
      </button>
    }
    { is_authorized &&
      <p>
        Wallet Address: {wallet_address}
      </p>
    }
    { is_authorized &&
      <button onClick={() => call_my_contract(...)}>
        Call Some Function
      </button>
    }
  );
}

function Parent_Object {
  return (
    <Polycogni>
      <Child_Object />
    </Polycogni>
  );
}

export default Parent_Object;`
      ],
      typeSpeed: 20,
      showCursor: false,
    });

    // Watch for content changes and auto-scroll
    const observer = new MutationObserver(() => {
      if (!scrollRef.current) return;
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });

    if (codeRef.current) {
      observer.observe(codeRef.current, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    return () => {
      typed.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="bg-[#141a24] rounded-xl p-6 h-[360px] overflow-y-auto custom-scrollbar"
    >
      <pre className="text-[#FFB5A6] font-mono text-sm leading-relaxed whitespace-pre-wrap">
        <code ref={codeRef}></code>
      </pre>
    </div>
  );
}
