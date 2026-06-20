"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

export default function KanbanBoard({

  stages,

  leads,

}: any) {

  const [localLeads,

    setLocalLeads] =

    useState(leads);

  async function onDragEnd(

    result: any

  ) {

    if (!result.destination)

      return;

    const leadId =

      result.draggableId;

    const newStage =

      result.destination.droppableId;

    const currentLead =

      localLeads.find(

        (lead: any) =>

          String(lead.id) === leadId

      );

    // Update UI instantly

    setLocalLeads(

      (prev: any) =>

        prev.map(

          (lead: any) =>

            String(lead.id) === leadId

              ? {

                  ...lead,

                  stage: newStage,

                }

              : lead

        )

    );

    // Update database

    const { error } =

      await supabase

        .from("leads")

        .update({

          stage: newStage,

          status: newStage,

        })

        .eq("id", leadId);

    if (error) {

      console.log(

        "KANBAN ERROR:",

        error

      );

      return;

    }

    // Create notification

    if (currentLead?.user_id) {

      try {

        await supabase

          .from("notifications")

          .insert([

            {

              user_id:

                currentLead.user_id,

              title:

                "Pipeline Updated",

              message:

                `Lead moved to ${newStage}`,

            },

          ]);

      }

      catch (error) {

        console.log(

          "Notification error:",

          error

        );

      }

    }

  }

  return (

    <DragDropContext

      onDragEnd={onDragEnd}

    >

      <div className="grid md:grid-cols-5 gap-6">

        {

          stages.map(

            (stage: any) => (

              <Droppable

                key={stage.id}

                droppableId={stage.id}

              >

                {(provided) => (

                  <div

                    ref={provided.innerRef}

                    {...provided.droppableProps}

                    className="

                    bg-[#111111]

                    border

                    border-[#232323]

                    rounded-3xl

                    p-5

                  "

                  >

                    <h2 className="text-2xl font-bold mb-6">

                      {stage.title}

                    </h2>

                    <div className="space-y-4">

                      {

                        localLeads

                          .filter(

                            (lead: any) =>

                              lead.stage === stage.id

                          )

                          .map(

                            (

                              lead: any,

                              index: number

                            ) => (

                              <Draggable

                                key={lead.id}

                                draggableId={String(lead.id)}

                                index={index}

                              >

                                {(provided) => (

                                  <div

                                    ref={provided.innerRef}

                                    {...provided.draggableProps}

                                    {...provided.dragHandleProps}

                                    className="

                                    bg-[#1A1A1A]

                                    border

                                    border-[#353535]

                                    rounded-2xl

                                    p-5

                                    hover:-translate-y-1

                                    hover:border-[#285C70]

                                    hover:shadow-2xl

                                    transition-all

                                    duration-300

                                    cursor-grab

                                  "

                                  >

                                    <h3 className="text-xl font-bold">

                                      {lead.name}

                                    </h3>

                                    <p className="mt-3">

                                      🏢 {lead.company}

                                    </p>

                                    <p>

                                      🤖 {lead.ai_score ?? 0}/10

                                    </p>

                                  </div>

                                )}

                              </Draggable>

                            )

                          )

                      }

                      {

                        provided.placeholder

                      }

                    </div>

                  </div>

                )}

              </Droppable>

            )

          )

        }

      </div>

    </DragDropContext>

  );

}